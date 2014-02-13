'use strict';
angular.module('attributionDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $q ,$filter) {
    $scope.campaigns = [];
    $scope.advertisers = [];
    $scope.selectionGroups = [];
    /*
    function OnAjaxComplete(data){
      $scope.$apply(function(){
        $scope.advertisers = data;
        for(var i = 0 ; i < $scope.advertisers.length ; i++ )
        {
          $scope.selectionGroups.push({
              item:$scope.advertisers[i].Name,
              group:"Advertsiers"}
          )

        }
        console.log("I'm here");
      });

    };
    */
    $http.get('http://localhost:8000/advertisers')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.UpdateAdvers(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    $http.get('http://localhost:8000/campaigns')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.UpdateCamps(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


    $scope.UpdateAdvers = function (data)
    {
      $scope.advertisers = data;
      for (var i = 0 ; i < $scope.advertisers.length ; i++)
      {
        $scope.selectionGroups.push({
            item: $scope.advertisers[i].Name,
            group: "Advertsiers"
          }
        );
      }
      $scope.$apply(function () {});
    };

    $scope.UpdateCamps = function (data)
    {
      $scope.campaigns = data;
      for (var i = 0 ; i < $scope.campaigns.length ; i++)
      {
        $scope.selectionGroups.push({
            item: $scope.campaigns[i].Name,
            group: "Campaigns"
          }
        );
      }
      $scope.$apply(function () { });
    };
  });