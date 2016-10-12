(function () {
  'use strict';

  angular
    .module('uptime')
    .component('statusElementComponent', {
      bindings: {
        status: '<',
        statusText: '<',
      },

      templateUrl: 'WebsiteList/status_element.html',

      controller: function ($scope) {
        this.status = 'pending';
        this.statusText = null;
      },
    });
}());
