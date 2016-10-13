(function () {
  'use strict';

  angular
    .module('uptime')
    .component('listElementComponent', {
      bindings: {
      },

      templateUrl: 'WebsiteList/list_element.html',

      controller: ['$scope', '$http', 'ConfigService', '$q', function ($scope, $http, ConfigService, $q) {
        this.statuses = [];
        this.sites = ConfigService.getSites();

        window.bnAddSite = function (site) {
          ConfigService.addSite(site);
        };
        

        angular.forEach(this.sites, function (key, value) {
          var req = {
            data: key,
            headers: {
              'Content-Type': 'application/json',
            },
            method: key.method,
            url: '/status',
          };

          $http
            .get('/status', {
              params: {
                data: key,
              },
            })
            .then(function (response) {
              console.log(response);
            },

            function (error) {
              console.error(error);
            });
        });
      }],
    });
}());
