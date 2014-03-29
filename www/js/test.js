var app = angular.module('myApp', []);

app.factory('campusQuestApi', function($http) {
    var apiURL = 'http://54.201.182.243:18080/';
    var doRequest = function(params) {
        return $http({
          method: 'GET',
          url: apiURL + params,
          headers: {
            'Access-Control-Allow-Origin': 'http://run.jsbin.io'
          }
        });
    };

    return {
      getGame: function(gameCode) { return doRequest('/api/event/retrieve/code/B7HU1');}
    };
});

app.controller('HomeCtrl', function($scope, campusQuestApi) {
  $scope.data = 'kkk';
  campusQuestApi.getGame().success(function(data) {
    $scope.$apply(function(scope) {
      scope.data = data;
    });
  });
});