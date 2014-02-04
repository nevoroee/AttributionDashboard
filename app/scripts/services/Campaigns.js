/**
 * Created by roee.nevo on 2/2/14.
 */
angular.module('attributionDashboardApp').factory('campaignService', function($rootScope, $http) {
  var campaignService = {};

  campaignService.data = {};

  //Gets the list of nuclear weapons
  campaignService.getCampaigns = function() {
    $http.get({method: 'GET', url:'http://localhost:8000/campaigns'})
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        campaignService.data.campaigs = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    return campaignService.data;
  };

  return campaignService;
});
