(function () {
  'use strict';

  angular
    .module('uptime')
    .component('listElementComponent', {
      bindings: {
      },

      templateUrl: 'WebsiteList/list_element.html',

      controller: ['$scope', '$http', function ($scope, $http) {
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
              switch (response.status) {
                case 200:
                  key.status = 'online';
                  key.text = 'Online';
                  key.checked = Date.now();
                  break;
                default:
                  break;
              }
            },

            function (error) {
              console.error(error);
            });
        });
      }],
    });
}());
