(function () {
  'use strict';

  angular
    .module('uptime')
    .service('ConfigService', ['$http', function ($http) {
      var data = {
        sites: []
      };

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
    }]);
}());
