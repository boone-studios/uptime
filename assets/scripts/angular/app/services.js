(function () {
  'use strict';

  angular
    .module('uptime')
    .service('ConfigService', ['$http', function ($http) {
      var data = {};

      var promise = $http.get('config.json').then(
        function success(response) {
          console.log('Loading configuration file...');
          data = angular.fromJson(response.data);
        },

        function error(response) {
          console.error(response);
        });

      return {
        promise: promise,
        getConfig: function () {
          return data;
        },
      };
    }]);
}());
