/*jslint node: true */
/* globals angular */
"use strict";

var app = angular.module('thingsiveseen', ['ui.router']);

app.factory('eventSvc', ['$http', function ($http) {
    var f = {
        events: []
    };
    f.get = function (id) {
        return $http.get('/api/events/'+id).then(function (res) {
            return res.data;
        });
    };
    f.getAll = function () {
        return $http.get('/api/events').success(function (data) {
            angular.copy(data, f.events);
        });
    };
    f.create = function (post) {
        return $http.post('/api/events', post).success(function (data) {
            f.events.push(data);
        });
    };
    return f;
}]);

app.controller('MainCtrl', [
    '$scope',
    'eventSvc',
    function ($scope, eventSvc) {
        $scope.events = eventSvc.events;
    }
]);

app.controller('NavCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);

app.controller('AdminCtrl', [
    '$scope',
    function ($scope) {

    }
]);

app.controller('EventCtrl', [
    '$scope',
    'eventSvc',
    'event',
    function ($scope, eventSvc, event) {
        $scope.event = event;
        
        /*$scope.addComment = function () {
            if($scope.body === '') { return; }

            posts.addComment(post._id, {
                body: $scope.body,
                author: 'user'
            }).success(function (comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function (comment) {
            posts.upvoteComment(post, comment);
        }*/
    }
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('events', {
                url: '/events',
                templateUrl: '/events.html',
                controller: 'MainCtrl',
                resolve: {
                    eventPromise: [
                        'eventSvc',
                        function(eventSvc) {
                            return eventSvc.getAll();
                        }
                    ]
                }
            })
            .state('event', {
                url: '/event/{id}',
                templateUrl: '/event.html',
                controller: 'EventCtrl',
                resolve: {
                    event: [
                        '$stateParams',
                        'eventSvc',
                        function($stateParams, eventSvc) {
                            return eventSvc.get($stateParams.id);
                        }
                    ]
                }

            })
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin.html',
                controller: 'AdminCtrl'
            });

        $urlRouterProvider.otherwise('events');
    }
]);