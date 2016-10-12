const _     = require('underscore');
const http  = require('q-io/http');

module.exports = (data) => {
    'use strict';

    // Make sure we're going to have a website to check
    if (Object.keys(data).length) {
      // Define variables
      let options = _.pick(data, ['hostname', 'port', 'path', 'method']);

      return http.request(options).then((res) => JSON.stringify(res.status));
    }
  };
