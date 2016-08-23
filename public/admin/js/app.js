'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers.main',
  'bootstrap',
  'angularMoment',
  'myApp.directives',
  'myApp.services.user',
  'myApp.services.admin',
  'myApp.services.quiz'
]).
config(function ($routeProvider, $locationProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol('<%');
  $interpolateProvider.endSymbol('%>');
  $routeProvider.
    when('/admin', { 
      templateUrl: '/templates/admin-homepage.html',
      controller: 'homepageCtrl',
    }).
     when('/admin/login', {
      templateUrl: '/templates/admin-login.html',
      controller: 'adminLoginCtrl',
      resolve: {
        isUser: function (Session, $location) {
          Session.get_user().then(function (data) {
            if (data && data.admin) {
                $location.path('/admin');
            }
          });
        }
      }
    }).
     when('/admin/logout',{
       resolve : {
         redirect : function (User, $location) {
           User.logout().then(function (data) {
             if(data){
                      javascript:document.execCommand("ClearAuthenticationCache");
                      return $location.path("/admin/login");
              }
           });
         }
       }
    }).
    when('/admin/quiz', {
      templateUrl: '/templates/admin-quiz.html',
      controller: 'quizCtrl'
    }).
    when('/admin/users', {
      templateUrl: '/templates/admin-manage-users.html',
      controller: 'manageUsersCtrl'
    }).
    when('/admin/coupons', {
      templateUrl: '/templates/admin-manage-coupons.html',
      controller: 'manageCouponsCtrl'
    }).
    when('/admin/user/:user_id', {
      templateUrl: '/templates/admin-edit-user.html',
      controller: 'editUserCtrl'
    }).
    otherwise({
      redirectTo: '/admin/login'
    });

    $locationProvider.html5Mode(true);
})
.run(['$rootScope', '$location', 'Session', function ($rootScope, $location,Session) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
          var params = next.$$route;
          var path = $location.path();
          if(path!='/admin/logout'){
               Session.get_user().then(function (user){
                     if(user && user.admin){
                      }
                    else{
                            event.preventDefault();
                            return $location.path("/admin/login");
                        }
                });
          }      
      });

}]);