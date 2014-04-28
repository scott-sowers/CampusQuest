angular.module('CampusQuest.directives',['ionic'])

.directive('achievementCard', function() {
    return {
        restrict: 'EA',
        templateUrl: 'templates/achievement-card.html',
        scope: {
            id: '=',
            name: '=',
            description: '=',
            photo: '=',
            complete: '=',
            number: '='
        },
        controller: function($scope, $element, $attrs, $ionicPopup, $ionicActionSheet, QuestSession) {
            function cameraSuccess(imageData) {
                $scope.$apply(function() {
                    $scope.photo = imageData;
                    $scope.complete = true;
                });
            }

            function cameraError(message) {
                $ionicPopup.alert({
                    title: 'Camera',
                    content: message
                }).then(function(res) {
                    //
                });
            }

            function deleteAchievement() {
                $scope.complete = false;
                $scope.photo = 'img/achievement-placeholder.png';
            }

            function getPicture() {
                $ionicActionSheet.show({
                    buttons: [
                        {text: 'Take Picture'},
                        {text: 'Photo from Album'},
                    ],
                    cancelText: 'Cancel',
                    buttonClicked: function(index) {
                        switch(index) {
                            case 0:
                                navigator.camera.getPicture( cameraSuccess, cameraError, {
                                    sourceType: Camera.PictureSourceType.CAMERA,
                                    destinationType: Camera.DestinationType.FILE_URI
                                });
                                break;
                            case 1:
                                navigator.camera.getPicture( cameraSuccess, cameraError, {
                                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    destinationType: Camera.DestinationType.FILE_URI
                                });
                        }
                        return true;
                    }
                });
            }

            function getNewPicture() {
                $ionicActionSheet.show({
                    buttons: [
                        {text: 'Take New Picture'},
                        {text: 'New Photo from Album'},
                    ],
                    destructiveText: 'Delete Achievement',
                    cancelText: 'Cancel',
                    buttonClicked: function(index) {
                        switch(index) {
                            case 0:
                                navigator.camera.getPicture( cameraSuccess, cameraError, {
                                    sourceType: Camera.PictureSourceType.CAMERA,
                                    destinationType: Camera.DestinationType.FILE_URI
                                });
                                break;
                            case 1:
                                navigator.camera.getPicture( cameraSuccess, cameraError, {
                                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    destinationType: Camera.DestinationType.FILE_URI
                                });
                        }
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        deleteAchievement();
                        return true;
                    }
                });
            }

            $scope.editPhoto = function() {
                if ($scope.complete == true) {
                    getNewPicture();
                } else {
                    getPicture();
                }
            };
        }
    };
});
