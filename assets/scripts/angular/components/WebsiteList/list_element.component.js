(function () {
  'use strict';

  angular
    .module('uptime')
    /**
     * Component for website monitor element
     * @inner statusElementComponent
     * @kind Component
     * @type {Object}
     */
    .component('listElementComponent', {
      bindings: {

      },

      templateUrl: 'WebsiteList/list_element.html',

      controller: ['_', '$scope', '$http', 'CheckStatusService', function (_, $scope, $http, Status) {
        this.statuses = [];
        this.sites = [
          {
            title: '200 Status Test',
            url: 'http://httpstat.us/',
            method: 'GET',
            status: 'pending',
            text: '',
            checked: 0,
            duration: 60000,
          },
          {
            title: '204 Status Test',
            url: 'http://httpstat.us/204',
            method: 'GET',
            status: 'pending',
            text: '',
            checked: 0,
          },
          {
            title: '500 Status Test',
            url: 'http://httpstat.us/500',
            method: 'GET',
            status: 'pending',
            text: '',
            checked: 0,
          },
        ];

        angular.forEach(this.sites, function (obj, pos) {
          // Check site status
          Status.check(obj)
            .then(function () {
              _.extend(obj, Status.getStatus());
            });
        });
      }],
    });
}());
