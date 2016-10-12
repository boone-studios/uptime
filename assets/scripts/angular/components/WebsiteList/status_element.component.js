(function () {
  'use strict';

  angular
    .module('uptime')
    .component('statusElementComponent', {
      bindings: {
        status: '<',
        text: '<',
      },

      templateUrl: 'WebsiteList/status_element.html',

      controller: [function ($scope) {

      }],
    });
}());
