(function () {
  'use strict';

  angular
    .module('uptime')
    .component('homePageComponent', {
      bindings: {
      },

      templateUrl: 'HomePage/home.html',

      controller: function ($scope) {
        $scope.configModal = false;

        $scope.hide = function () {
          $scope.configModal = false;
        };
      },
    });
}());
