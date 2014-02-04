'use strict';
angular.module('attributionDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $q ,$filter) {
    $scope.campaigns = [];
    $scope.advertisers = [];
    $http.get('http://localhost:8000/campaigns')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.campaigns = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    $http.get('http://localhost:8000/advertisers')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        $scope.advertisers = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  });