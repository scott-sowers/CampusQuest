angular.module('CampusQuest.controllers', ['ionic'])

.controller('MenuCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

})

.controller('StartGameCtrl', function($scope, $state, $ionicPopup, QuestApi, QuestSession) {
    $scope.startGame = function(gameCode,teamName) {

        QuestApi.getEventByCode(gameCode).success(function(data) {
            var eventId = data.eventId;
            var achievements = data.eventGame.gameAchievements;

            QuestApi.addTeamToEvent(eventId,teamName).success(function(data) {
                QuestSession.init(eventId, data.teamName, achievements, data.teamTeamAchievements);
                $state.go('app.achievements');
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

.controller('AchievementsCtrl', function($scope, $state, $ionicPopup, $ionicSideMenuDelegate, QuestApi, QuestSession) {

        $scope.achievements = QuestSession.getAchievements();
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }
});
