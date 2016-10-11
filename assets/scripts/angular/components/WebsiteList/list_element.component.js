(function () {
  'use strict';

  angular
    .module('uptime')
    .component('listElementComponent', {
      bindings: {
        users: '<',
      },
      templateUrl: 'WebsiteList/list_element.html',
      controller: [function () {
        var _this = this;
      }]
    });
}());
