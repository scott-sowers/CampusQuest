angular.module('CampusQuest', ['ionic', 'apiMock', 'ng-iscroll', 'CampusQuest.services', 'CampusQuest.controllers', 'CampusQuest.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, httpInterceptorProvider) {

    //Configure navigation
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MenuCtrl'
        })
        .state('app.achievements', {
            url: "/achievements",
            views: {
                'menuContent': {
                    templateUrl: "templates/achievements.html",
                    controller: 'AchievementsCtrl'
                }
            }
        })
        .state('startGame', {
            url: "/start-game",
            templateUrl: "templates/start-game.html",
            controller: 'StartGameCtrl'
        })
        .state('app.about', {
            url: '/about',
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutCtrl'
                }
            }
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
