angular.module('CampusQuest.directives',['ionic'])

.directive('achievementCard', function() {
    return {
        restrict: 'EA',
        templateUrl: '/templates/achievement-card.html',
        scope: {
            id: '=',
            name: '=',
            description: '=',
            photo: '='
        },
        controller: function($scope, $element, $attrs, QuestSession) {
            $scope.takePhoto = function() {};
        }
    };
});
