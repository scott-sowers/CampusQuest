angular.module('CampusQuest', ['ionic', 'apiMock', 'CampusQuest.services', 'CampusQuest.controllers', 'CampusQuest.directives'])

.config(function($stateProvider, $urlRouterProvider, httpInterceptorProvider) {

    //Configure navigation
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

    // Configure API Mock
    httpInterceptorProvider.config({
        mockDataPath: '/mock_data',
        apiPath: 'http://ec2-54-201-182-243.us-west-2.compute.amazonaws.com:18080/api',
        apiMocked: true
    });
});
