/**
 * Boone Software Uptime HTTP Monitor
 * @author Wes King
 */
'use strict';

// Dependencies
const _         = require('underscore');
const http      = require('q-io/http');
const q         = require('q');
const Endpoint  = require('../schema/endpoint');
const Result    = require('../schema/result');

class Monitor {

  getEndpoints() {
    let deferred = q.defer();

    Endpoint.find((error, results) => {
      if (error) {
        deferred.reject(error);
      }

      deferred.resolve(results);
    });

    return deferred.promise;
  }

  saveResult(result) {
    let deferred = q.defer();
    let entity = new Result(result);

    entity.save((error, entity) => {
      if (error) {
        deferred.reject(error);
      }

      deferred.resolve(entity);
    });

    return deferred.promise;
  }

  testEndpoint(endpoint) {
    let deferred = q.defer();

    http.request(endpoint).then((res) => {
      deferred.resolve({
        code: res.status,
        endpoint_id: endpoint._id,
        time: new Date(),
        headers: res.headers,
      });
    });

    return deferred.promise;
  }

  main() {
    console.log('[INFO] Initializing Monitor app.');
    this.getEndpoints()
      .then((endpoints) => q.all(endpoints.map((endpoint) =>  this.testEndpoint(endpoint))))
      .then((results) => q.all(results.map((result) =>  this.saveResult(result))))
      .then((saved) => console.log(saved.length + ' results saved to DB'))
      .catch((error) => console.log('[ERROR] ' + error));
  }

  init() {
    setInterval(this.main.bind(this), 5000);
  }
}

module.exports = Monitor;
