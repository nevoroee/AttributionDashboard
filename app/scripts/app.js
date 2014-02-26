'use strict';

angular.module('attributionDashboardApp', [
    'ngRoute',
    'localytics.directives',
    'highcharts-ng',
    'ngBootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
