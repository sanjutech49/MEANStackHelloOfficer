'use strict';

var app = angular.module('myApp.services.admin', []);

app.value('version', '0.1');


app.factory('Admin', function ($http, $q, Session) {
  var usrService = {};
  usrService.update = function(params) {
    var d = $q.defer();
    $http
      .post('/user/update', params)
      .success(function (res){
        d.resolve(res.user);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  usrService.getAllUsers = function(params) {
     var d = $q.defer();
     $http
      .post('/user/getAllUsers', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;
  };

  usrService.SearchUser = function(params) {
     var d = $q.defer();
     $http
      .post('/user/SearchUser', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;
  };
  

  usrService.updateThisUser = function(params) {
     var d = $q.defer();
     $http
      .post('/user/updateThisUser', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;
  };

  usrService.deleteThisUser = function(params) {
     var d = $q.defer();
     $http
      .post('/user/deleteThisUser', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;
  };


  usrService.getAllSecurityQuestions=function(){

     var d = $q.defer();
     $http
      .post('/securityQuestions/list',{})
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;

  };

  usrService.ResetUserPassword = function(params){
     
       var d = $q.defer();
     $http
      .post('/user/adminResetUserPassword',params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
     return d.promise;

  };


  return usrService;
});


