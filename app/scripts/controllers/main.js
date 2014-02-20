'use strict';
var app = angular.module('attributionDashboardApp')
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
            item: $scope.advertisers[i],
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
            item: $scope.campaigns[i],
            group: "Campaigns"
          }
        );
      }
      $scope.$apply(function () { });
    };



    $scope.chartOptions =  {
      chart: { type: 'line' },
      title: { text: 'Fruit Consumption' },
      xAxis: { categories: ['Apples', 'Bananas', 'Oranges'] },
      yAxis: { title: { text: 'Fruit eaten' } },
      series: [
        { name: 'Jane', data: [1, 0, 4] },
        { name: 'John', data: [5, 7, 3] }
      ]
    };

    $scope.chartOptions.series = [
      { name: 'Mark', data: [1, 0.5, 4] },
      { name: 'Dave', data: [5, 6, 3] },
      { name: 'Nick', data: [0, 2, 7] }];


    $scope.selectChanged = function()
    {
      //TODO: doesn't work on remove
      //TODO: keep the advertiser selected
      //TODO: on selecting campain limit the selection to those camapigns
      if ($scope.selection == [])
      {
        $scope.UpdateAdvers($scope.advertisers);
        $scope.UpdateCamps($scope.campaigns);
      }
      if ($scope.selection[0].group == "Advertsiers")
      {
        $scope.selectionGroups = [];
        for (var i = 0 ; i < $scope.campaigns.length ; i++)
        {
          if ($scope.campaigns[i].AdvertiserID == $scope.selection[0].item.id)
          {
            $scope.selectionGroups.push({
                item: $scope.campaigns[i],
                group: "Campaigns"
              }
            );
          }
        }
      }
    }
});

app.directive("highcharts", function() {
  return {
    link: function(scope, el, attrs) {
      var options = scope.$eval(attrs.highcharts);
      options.chart.renderTo = el[0];
      new Highcharts.Chart(options);
    }
  };
});
