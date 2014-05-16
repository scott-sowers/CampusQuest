angular.module('CampusQuest.controllers', ['ionic'])


.controller('StartGameCtrl', function($scope, $state, $ionicPopup, QuestApi, QuestSession, uppercaseFilter) {
    // Initialize the view model
    $scope.data = {};

    // Transform the Game Code input to uppercase
    $scope.$watch('data.gameCode', function() {
        $scope.data.gameCode = uppercaseFilter($scope.data.gameCode);
    });


    // Validate the Start Game form. If validated, start the Game
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
                $state.go('achievements');

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

.controller('AchievementsCtrl', function($scope, $state, $timeout, $ionicModal, /*$ionicSideMenuDelegate,*/ QuestApi, QuestSession) {
        // Retrieve the list of achievments and bind to the view
        $scope.achievements = QuestSession.getAchievements();

        /*
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }*/
    $scope.quitGame = function() {
        $state.go('startGame');
    }

    $ionicModal.fromTemplateUrl('templates/menu.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Update iScroll directive when achievements are modified
    $scope.$watch('achievements', function() {
        $timeout(function() {
            $scope.myScroll.refresh();
        }, 500);
    }, true);

    // In-game Options modall

});
