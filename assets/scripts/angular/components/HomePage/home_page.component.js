(function () {
  'use strict';

  angular
    .module('uptime')
    .component('homePageComponent', {
      bindings: {
        dashboard: '<',
      },

      templateUrl: 'HomePage/home.html',
    });
}());
