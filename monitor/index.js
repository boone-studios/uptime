/**
 * Boone Software Uptime HTTP Monitor
 * @author Wes King
 */
'use strict';

// Dependencies
const q         = require('Q');
const http      = require('q-io/http');
const _         = require('underscore');
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

    http.request(options).then((res) => {
      deferred.resolve({
        code: res.code,
        body: res.body,
        headers: res.headers
      });
    });

    return deferred.promise;
  }

  main() {
    this.getEndpoints()
      .then((endpoints) => {
        return q.all(endpoints.map((endpoint) => {
          return this.testEndpoint(endpoint);
        }))
      })
      .then((results) => {
        return q.all(results.map((result) => {
          return this.saveResult(result);
        }))
      })
  }

  init() {
    setInterval(this.main, 5000);
  }

}
