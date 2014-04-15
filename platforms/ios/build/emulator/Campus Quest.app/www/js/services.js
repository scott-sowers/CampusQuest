angular.module('CampusQuest.services',[])

.factory('QuestSession', function($rootScope) {
    var _teamName;
    var _eventId;
    var _achievements;

    function loadAchievements(teamAchievements) {
        var defaultPhoto = '/img/achievement-placeholder.png';
        for (var i = 0; i < _achievements.length; i++) {
            _achievements[i].achievementPhoto = defaultPhoto;
            _achievements[i].achievementComplete = false;
        }
    };

    return {
        teamName: _teamName,
        eventId: _eventId,
        achievements: _achievements,
        init: function(eventId, teamName, eventAchievements, teamAchievements) {
            _eventId = eventId;
            _teamName = teamName;
            _achievements = eventAchievements;
            loadAchievements(teamAchievements);
        },
        getAchievements: function() {
            return _achievements;
        }
    };
})

.factory('QuestApi', function($http) {
    var _baseUrl = 'http://ec2-54-201-182-243.us-west-2.compute.amazonaws.com:18080/api';
    var _doRequest = function(method, urlParams) {
        var data = arguments[2] || '';
        return $http({
            method: method,
            url: _baseUrl + '/' + urlParams,
            data: data
        });
    };

    return {
        getEventByCode: function(eventCode) {
            return _doRequest('GET', 'event/retrieve/code/' + eventCode);
        },
        addTeamToEvent: function(eventId, teamName) {
            var data = [{
                name: teamName,
                point: 0,
                events: [{
                    id: eventId
                }]
            }];
            return _doRequest('POST', 'team/add', data);
        },
        addTeamAchievement: function(teamId, achievementId, photoUrl) {
            var data = [{
                team: teamId,
                achievement: achievementId,
                picture: photoUrl
            }];
            return _doRequest('POST', 'teamachievement/add', data);
        },
        editTeamAchievement: function(teamId, achievementId, photoUrl) {
            var data = [{
                team: teamId,
                achievement: achievementId,
                picture: photoUrl
            }];
            return _doRequest('PUT', 'teamachievement/edit', data);
        },
        getTeamByName: function(teamName) {
            return _doRequest('GET', 'team/retrieve/name/' + teamName);
        }
    };
});
