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
        }
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
            switch (response.status) {
              case 200:
                data.status = 'online';
                data.text = 'Online';
                data.checked = Date.now();
                break;
              default:
                break;
            }
          },

          function (error) {
            console.error(error);
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
        var obj = {};

        if (code === 200) {
          //obj.
        }
      };

      return {
        getResponse: filter,
      };
    });
}());
