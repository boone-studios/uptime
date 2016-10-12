(function () {
  'use strict';

  angular
    .module('uptime')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      // Remove # from URL
      $locationProvider.html5Mode(true);

      // For any unmatched URL, redirect
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('app', {
          abstract: true,
          templateUrl: 'App/app_wrapper.html',
        })
        .state('app.home', {
          url: '/',
          component: 'homePageComponent',
        });
    });
}());
