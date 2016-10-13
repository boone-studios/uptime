(function () {
  'use strict';

  angular
    .module('uptime')
    .controller('AppController', ['$scope', 'ConfigService', function ($scope, ConfigService) {

      // Add some dummy data for us to use
      ConfigService
        .addSite({
          title: 'Boone Software',
          url: 'https://boone.io',
          method: 'GET',
          status: 'online',
          text: 'Online',
        })
        .addSite({
          title: '2 Cool Percussion',
          url: 'http://2coolpercussion.com',
          method: 'GET',
          status: 'error',
          text: '404 Not Found',
        });

      // As app loads, load configuration
      ConfigService.promise
        .then(function () {
          // Set brand name
          $scope.brand = ConfigService.getConfig().brand_raw;
        });
    },
  ]);
}());
