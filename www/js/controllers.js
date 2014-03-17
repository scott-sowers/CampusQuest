angular.module('CampusQuest.controllers', ['ionic'])

.controller('AchievementsCtrl', function($scope) {

})

.controller('StartGameCtrl', function($scope, $state, $ionicPopup) {
    $scope.formData = {};
    $scope.startGame = function(gameCode,teamName) {
        if (gameCode == 123456) {
            $state.go('achievements');   
        } else {
            $ionicPopup.alert({
                title: 'Invalid Game Code'
            }).then(function(res) {
                // do nothing
            });
        }
    };    
});