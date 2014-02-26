'use strict';
var app = angular.module('attributionDashboardApp')
  .controller('MainCtrl', function ($scope, $http, $q, $filter) {
    $scope.campaigns = [];
    $scope.advertisers = [];
    $scope.selectionGroups = [];
    $scope.timeline = [];

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
    $http.get('http://localhost:8000/timeline')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.UpdateTimeline(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


    $scope.UpdateAdvers = function (data) {
      $scope.advertisers = data;
      for (var i = 0; i < $scope.advertisers.length; i++) {
        $scope.selectionGroups.push({
            item: $scope.advertisers[i],
            group: "Advertsiers"
          }
        );
      }

      if (!$scope.$$phase) {
        $scope.$apply(function () {
        });
      }
    };

    $scope.UpdateCamps = function (data) {
      $scope.campaigns = data;
      for (var i = 0; i < $scope.campaigns.length; i++) {
        $scope.selectionGroups.push({
            item: $scope.campaigns[i],
            group: "Campaigns"
          }
        );
      }
      if (!$scope.$$phase) {
        $scope.$apply(function () {
        });
      }
    };

    $scope.UpdateTimeline = function (data) {
      $scope.timeline = data;

      var catagories = ["None"];
      for (var key in data[0]) {
        if (key == 'Dates') {
          continue;
        }
        catagories.push(key);
      }
      $scope.options = {left: catagories, right: catagories};

      if (!$scope.$$phase) {
        $scope.$apply(function () {
        });
      }
    }


    $scope.updateTimelineDataByCategory = function (leftCategory, rightCategory) {

      var datesArray = [];
      var leftDataArray = [];
      var rightDataArray = [];
      for (var i = 0; i < $scope.timeline.length; i++) {
        var leftParsed = parseInt($scope.timeline[i][leftCategory]);
        var rightParsed = parseInt($scope.timeline[i][rightCategory]);

        //if both of them are not NaN then insert the dot to the series.
        //if both are not none we can decress the scale by removing unused dates
        if (!isNaN(leftParsed) || !isNaN(rightParsed)) {
          leftDataArray.push(leftParsed)
          rightDataArray.push(rightParsed)
          datesArray.push($scope.timeline[i].Dates)
        }
      }

      $scope.chartConfig.xAxis = { categories: datesArray };
      $scope.chartConfig.series = [
        { name: 'Left Data Array', yAxis: 0, data: leftDataArray },
        { name: 'Right Data Array', yAxis: 1, data: rightDataArray }
      ];
    }


    $scope.selectChanged = function () {
      //TODO: doesn't work on remove
      //TODO: keep the advertiser selected
      //TODO: on selecting campaign limit the selection to those campaigns
      if ($scope.selection == []) {
        $scope.UpdateAdvers($scope.advertisers);
        $scope.UpdateCamps($scope.campaigns);
      }
      if ($scope.selection[0].group == "Advertsiers") {
        $scope.selectionGroups = [];
        for (var i = 0; i < $scope.campaigns.length; i++) {
          if ($scope.campaigns[i].AdvertiserID == $scope.selection[0].item.id) {
            $scope.selectionGroups.push({
                item: $scope.campaigns[i],
                group: "Campaigns"
              }
            );
          }
        }
      }
    }

    $scope.leftDropdownChanged = function () {
      $scope.updateTimelineDataByCategory($scope.left, $scope.right);
      $scope.chartConfig.options.yAxis[0].title.text = $scope.left;

    }


    $scope.rightDropdownChanged = function () {
      $scope.updateTimelineDataByCategory($scope.left, $scope.right);
      $scope.chartConfig.options.yAxis[1].title.text = $scope.right;
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },

        yAxis: [
          { title: { text: 'Fruit eaten' }},
          { title: { text: 'Games' }, opposite: true}
        ]

      },
      series: [],
      title: {
        text: 'Campaign Timeline'
      },

      loading: false
    }
  });

app.directive("highcharts", function () {
  return {
    link: function (scope, el, attrs) {
      var options = scope.$eval(attrs.highcharts);
      options.chart.renderTo = el[0];
      new Highcharts.Chart(options);
    }
  };
});
