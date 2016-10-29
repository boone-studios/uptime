(function () {
  'use strict';

  angular
    .module('uptime')
    /**
     * Component for status icon
     * @kind Component
     * @type {Object}
     */
    .component('statusElementComponent', {
      bindings: {
        status: '<',
        text: '<',
      },

      templateUrl: 'WebsiteList/status_element.html',
    });
}());
