'use strict';

var app = angular.module('myApp.services.quiz',[]);

app.value('version', '0.1');

app.factory('Quiz', function ($http) {
  var quizService = {};
  quizService.list = function() {
    var request = $http
      .get('/quiz/list');

      return request;
  };
  quizService.remove = function (id) {
    var request = $http
      .post('/quiz/remove', {_id : id});

    return request;
  };
  quizService.update = function (params) {
    var request = $http
      .post('/quiz/updateQuiz', params);

    return request;

  };
  quizService.create = function (params) {
    console.log(params);
    var request = $http
      .post('/quiz/create', params);

    return request;
  };
  return quizService;
});
