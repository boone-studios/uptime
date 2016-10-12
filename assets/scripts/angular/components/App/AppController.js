(function () {
  'use strict';

  angular
    .module('uptime')
    .controller('AppController', ['$scope', 'ConfigService', function ($scope, ConfigService) {
      // As app loads, load configuration
      ConfigService.promise
        .then(function () {
          // Set brand name
          $scope.brand = ConfigService.getConfig().brand;
        });
    },
  ]);
}());
