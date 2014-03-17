angular.module('CampusQuest', ['ionic', 'CampusQuest.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('achievements', {
            url: "/achievements",
            templateUrl: "templates/achievements.html",
            controller: 'AchievementsCtrl'
        })
        .state('startGame', {
            url: "/start-game",
            templateUrl: "templates/start-game.html",
            controller: 'StartGameCtrl'
        });
    
    $urlRouterProvider.otherwise("/start-game");
});