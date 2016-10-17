(function () {
  'use strict';

  angular
    .module('uptime')
    .factory('ConfigService', function ($http) {
      var data = {};

      var promise = $http.get('config.json').then(
        function success(response) {
          console.log('Loading configuration file...');
          data = angular.fromJson(response.data);
          data.sites = [];
        },

        function error(response) {
          console.error(response);
        });

      return {
        promise: promise,
        getConfig: function () {
          return data;
        },

        addSite: function (site) {
          data.sites.push(site);
          return this;
        },

        removeSite: function (site) {
          var index = data.sites.indexOf(site);
          if (index > -1) {
            data.sites.splice(index, 1);
          }

          return this;
        },

        getSites: function () {
          return data.sites;
        },
      };
    })
    .factory('CheckStatusService', function ($http, ResponseCodeService) {
      var data = {};

      var checkStatus = function (siteObject) {
        var obj = {};

        return $http
          .get('/status', {
            params: {
              data: siteObject,
            },
          })
          .then(function (response) {
            if (response.status === 200) {
              data.status = 'online';
              data.text = 'Online';
            } else {
              data.status = 'warning';
              data.text = response.statusText;
            }

            data.checked = Date.now();
          },

          function (error) {
            if (error.hasOwnProperty('status')) {
              data.status = 'error';
              data.text = error.statusText;
              data.checked = Date.now();
            } else {
              console.error(error);
            }
          });
      };

      return {
        check: checkStatus,
        getStatus: function () {
          return data;
        },
      };
    })
    .factory('ResponseCodeService', function () {
      var filter = function (code) {
        var codes = {
          100: 'Continue',
          101: 'Switching Protocols',
          102: 'Processing',
          200: 'OK',
          201: 'Created',
          202: 'Accepted',
          203: 'Non-Authoritative Information',
          204: 'No Content',
          205: 'Reset Content',
          206: 'Partial Content',
          207: 'Multi-Status',
          300: 'Multiple Choices',
          301: 'Moved Permanently',
          302: 'Found',
          303: 'See Other',
          304: 'Not Modified',
          305: 'Use Proxy',
          306: 'Switch Proxy',
          307: 'Temporary Redirect',
          400: 'Bad Request',
          401: 'Unauthorized',
          402: 'Payment Required',
          403: 'Forbidden',
          404: 'Not Found',
          405: 'Method Not Allowed',
          406: 'Not Acceptable',
          407: 'Proxy Authentication Required',
          408: 'Request Timeout',
          409: 'Conflict',
          410: 'Gone',
          411: 'Length Required',
          412: 'Precondition Failed',
          413: 'Request Entity Too Large',
          414: 'Request-URI Too Long',
          415: 'Unsupported Media Type',
          416: 'Requested Range Not Satisfiable',
          417: 'Expectation Failed',
          418: 'I\'m a teapot',
          422: 'Unprocessable Entity',
          423: 'Locked',
          424: 'Failed Dependency',
          425: 'Unordered Collection',
          426: 'Upgrade Required',
          449: 'Retry With',
          450: 'Blocked by Windows Parental Controls',
          500: 'Internal Server Error',
          501: 'Not Implemented',
          502: 'Bad Gateway',
          503: 'Service Unavailable',
          504: 'Gateway Timeout',
          505: 'HTTP Version Not Supported',
          506: 'Variant Also Negotiates',
          507: 'Insufficient Storage',
          509: 'Bandwidth Limit Exceeded',
          510: 'Not Extended',
        };

        return (code.hasOwnProperty(code)) ? codes[code] : 'Unknown';
      };

      return {
        getResponse: filter,
      };
    });
}());
