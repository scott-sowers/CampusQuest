angular.module('CampusQuest', ['ionic', 'apiMock', 'CampusQuest.services', 'CampusQuest.controllers', 'CampusQuest.directives'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, httpInterceptorProvider) {

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

    // Configure CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Configure API Mock
    httpInterceptorProvider.config({
        mockDataPath: 'mock_data',
        apiPath: 'http://ec2-54-201-182-243.us-west-2.compute.amazonaws.com:18080/api',
        apiMocked: false
    });
});
