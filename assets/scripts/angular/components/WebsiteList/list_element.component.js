(function () {
  'use strict';

  angular
    .module('uptime')
    .component('listElementComponent', {
      bindings: {
      },

      templateUrl: 'WebsiteList/list_element.html',

      controller: ['_', '$scope', '$http', 'CheckStatusService', function (_, $scope, $http, Status) {
        this.statuses = [];
        this.sites = [
          {
            title: 'Boone Software',
            url: 'https://boone.io',
            method: 'GET',
            status: 'pending',
            text: '',
            checked: 0,
          },
          {
            title: '2 Cool Percussion',
            url: 'http://2coolpercussion.com',
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
