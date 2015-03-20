/*jslint node: true */
/* globals angular */
"use strict";

var app = angular.module('thingsiveseen', ['ui.router']);

/*
app.factory('posts', ['$http', function ($http) {
    var f = {
        posts: []
    };
    f.get = function (id) {
        return $http.get('/posts/'+id).then(function (res) {
            return res.data;
        })
    };
    f.getAll = function () {
        return $http.get('/posts').success(function (data) {
            angular.copy(data, f.posts);
        })
    };
    f.create = function (post) {
        return $http.post('/posts', post).success(function (data) {
            f.posts.push(data);
        })
    };
    f.upvote = function (post) {
        return $http.put('/posts/'+post._id+'/upvote', post).success(function (data) {
            post.upvotes += 1;
        })
    };
    f.downvote = function (post) {
        return $http.put('/posts/' + post._id + '/downvote', post).success(function (data) {
            post.upvotes -= 1;
        })
    };
    f.addComment = function (id, comment) {
        return $http.post('/posts/'+id+'/comments', comment);
    };
    f.upvoteComment = function (post, comment) {
        return $http.put('/posts/'+post._id+'/comments/'+comment._id+'/upvote').success(function (data) {
            comment.upvotes += 1;
        })
    };
    return f;
}]);
*/

app.factory('events', ['$http', function ($http) {
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
    'events',
    function ($scope, eventFactory) {
        $scope.events = eventFactory.events;

        /*$scope.addPost = function () {
            if(!$scope.title || $scope.title === '') { return ;}

            eventFactory.create({
                title: $scope.title,
                link: $scope.link
            });

            $scope.title = '';
            $scope.link = '';
        };*/

        /*$scope.incrementUpvotes = function(event) {
            eventFactory.upvote(event);
        };
        $scope.decrementUpvotes = function(event) {
            if(event.upvotes > 0) {
                eventFactory.downvote(event);
            }
        };*/
    }
]);

app.controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    function ($scope, posts, post) {
        $scope.post = post;
        
        $scope.addComment = function () {
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
        }
    }
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    eventPromise: [
                        'events',
                        function(events) {
                            return events.getAll();
                        }
                    ]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: [
                        '$stateParams',
                        'posts',
                        function($stateParams, posts) {
                            return posts.get($stateParams.id);
                        }
                    ]
                }

            });

        $urlRouterProvider.otherwise('home');
    }
]);