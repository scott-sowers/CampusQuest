angular.module('CampusQuest.controllers', ['ionic'])

.controller('StartGameCtrl', function($rootScope, $scope, $state, $ionicPopup, QuestApi, QuestSession) {
    $scope.startGame = function(gameCode,teamName) {

        QuestApi.getEventByCode(gameCode).success(function(data) {
            var eventId = data.eventId;
            var achievements = data.eventGame.gameAchievements;

            QuestApi.addTeamToEvent(eventId,teamName).success(function(data) {
                QuestSession.init(eventId, data.teamName, achievements, data.teamTeamAchievements);
                $state.go('achievements');
            }).error(function(data) {
                $ionicPopup.alert({
                    title: 'Invalid Team Name'
                }).then(function(res) {

                });
            });

        }).error(function(data, status, headers) {
            $ionicPopup.alert({
                title: 'Invalid Game Code'
            }).then(function(res) {
                // do nothing
            });
        });
    };
})

.controller('AchievementsCtrl', function($scope, $state, $ionicPopup, QuestApi, QuestSession) {
    //$scope.$on('achievementsUpdated', function() {
        $scope.achievements = QuestSession.getAchievements();
    //});
});
