angular.module('CampusQuest.controllers', ['ionic'])

.controller('MenuCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

})

.controller('StartGameCtrl', function($scope, $state, $ionicPopup, QuestApi, QuestSession) {
    $scope.startGame = function(gameCode,teamName) {
        // Check for network connectivity
        /*if (navigator.connection.type == Connection.NONE) {
            $ionicPopup.alert({
                title: 'No Network Connection'
            }).then(function(res) {
                //
            });
            return;
        }*/

        // Retrieve the event details, given the event ID
        QuestApi.getEventByCode(gameCode).success(function(data) {
            var eventId = data.eventId;
            var achievements = data.eventGame.gameAchievements;

            // Event details retrieved, add a team to the event and start the game
            QuestApi.addTeamToEvent(eventId,teamName).success(function(data) {
                QuestSession.init(eventId, data.teamName, achievements, data.teamTeamAchievements);
                $state.go('app.achievements');

            // Team not added, game not started
            }).error(function(data) {
                $ionicPopup.alert({
                    title: 'Invalid Team Name'
                }).then(function(res) {

                });
            });

        // Event details not retrieved, throw an error
        }).error(function(data, status, headers) {
            $ionicPopup.alert({
                title: 'Invalid Game Code'
            }).then(function(res) {
                // do nothing
            });
        });
    };
})

.controller('AchievementsCtrl', function($scope, $state, $timeout, $ionicPopup, $ionicSideMenuDelegate, QuestApi, QuestSession) {

        $scope.achievements = QuestSession.getAchievements();
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }
        $scope.$watch('achievements', function() {
            $timeout(function() {
                $scope.myScroll.refresh();
            }, 500);
        }, true);
});
