(function () {
  'use strict';

  angular
    .module('uptime')
    .controller('AppController', ['$rootScope', '$scope', 'ConfigService', function ($rootScope, $scope, ConfigService) {
      // As app loads, load configuration
      ConfigService.promise
        .then(function () {
          // Set brand name
          $scope.brand = ConfigService.getConfig().brand_raw;
          $scope.theme = ConfigService.getConfig().theme;

          $scope.show = function () {
            $rootScope.$broadcast('propogateModal', true);
          };
        });
    },
  ]);
}());
