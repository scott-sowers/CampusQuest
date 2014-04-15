angular.module('CampusQuest.controllers', ['ionic'])



.controller('StartGameCtrl', function($rootScope, $scope, $state, $ionicPopup, QuestApi, QuestSession) {
    $scope.startGame = function(gameCode,teamName) {

        QuestApi.getEventByCode(gameCode).success(function(data) {
            var eventId = data.eventId;
            var achievements = data.eventGame.gameAchievements;

            QuestApi.addTeamToEvent(teamName).success(function(data) {
                QuestSession.init(eventId, data.teamName, achievements, data.teamTeamAchievements);
                $rootScope.$emit('achievementsUpdated');
                $state.go('achievements');
            }).error(function(data) {
                $ionicPopup.alert({
                    title: 'Invalid Team Name'
                }).then(function(res) {

                });
            });

        }).error(function(data) {
            $ionicPopup.alert({
                title: 'Invalid Game Code'
            }).then(function(res) {
                // do nothing
            });
        });
    };
})

.controller('AchievementsCtrl', function($scope, $state, $ionicPopup, QuestApi, QuestSession) {
    /*QuestSession.onAchievementsUpdated($scope,function() {
        console.log('foo-bar-1');
        $scope.achievements = QuestSession.achievements;
    })*/
    $scope.achievements = QuestSession.getAchievements();
    $scope.$on('achievementsUpdated', function() {
        console.log('updated');
    });
});
