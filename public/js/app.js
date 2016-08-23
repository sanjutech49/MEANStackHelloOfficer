'use strict';

// Declare app level module which depends on filters, and services
/* 'pubnub.angular.service',*/
angular.module('myApp', [
  'myApp.controllers.preLogin',
  'myApp.controllers.myClass',
  'angularMoment',
  'myApp.filters',
  'myApp.services.user',
  'myApp.services.quiz',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol('<%');
  $interpolateProvider.endSymbol('%>');
  $('#openBookToggle').hide();
  $routeProvider.
    //prelogin
    when('/', {
      templateUrl: '/templates/homepage.html',
      controller: 'homepageCtrl'
    }).
    when('/beta', {
      templateUrl: '/templates/beta.html',
      controller: 'betaCtrl'
    }).
    when('/sample22', {
      templateUrl: '/templates/security-questions.html',
      controller: 'sampleCtrl'
    }).
    when('/help', {
      templateUrl: '/templates/help.html',
      controller: 'helpPageCtrl'
    }).
    when('/verify-account', {
      templateUrl: '/templates/verify-account.html',
      controller: 'verfiyAccountCtrl'
    }).
     when('/payment-success', {
      templateUrl: '/templates/payment-success.html',
      controller: 'paymentSuccessCtrl'
    }).
    when('/how-it-works', {
      templateUrl: '/templates/how-it-works.html',
      controller: 'homepageCtrl'
    }).
    when('/contact', {
      templateUrl: '/templates/contact.html',
      controller: 'contactCtrl'
    }).
    when('/myprofile', {
      templateUrl: '/templates/profile.html',
      controller: 'profileCtrl',
      auth: true
    }).
    when('/frequently-asked-questions', {
      templateUrl: '/templates/faq.html',
      controller: 'faqCtrl'
    }).
    when('/privacy-agreement',{
      templateUrl: '/templates/privacy-agreement.html',
      controller: 'privacyAgreementCtrl'
    }).
    when('/terms-and-conditions',{
      templateUrl: '/templates/terms-and-conditions.html',
      controller: 'TandCCtrl'
    }).
    when('/section-i-quiz', {
      templateUrl: '/templates/section-i-quiz.html',
      controller: 'sectionQuizExampleCtrl'
    }).
    when('/get-started', {
      templateUrl: '/templates/get-started.html',
      controller: 'GetStartedCtrl'
    }).
    when('/security-questions', {
      templateUrl: '/templates/security-questions.html',
      controller: 'SecurityQuestionsCtrl'
    })
    .when('/logout', {
      resolve : {
        redirect : function (User, $location) {
          User.logout().then(function (data) {
            if(data){
                      javascript:document.execCommand("ClearAuthenticationCache");
                      return window.location.href='/';
            }
          });
        }
      }
    })
    .when('/login', {
      templateUrl: '/templates/auth.html',
      controller: 'LoginCtrl',
      resolve: {
        isUser: function (Session, $location) {
          Session.get_user().then(function (data) {
            if (data && data._id) {
              if (data.class_status) {
                $location.url('/myclass/'+ data.class_status);
              } else {
                $location.path('/myclass');
              }
            }
          });
        }
      }
    }).
    when('/reset-password', {
      templateUrl: '/templates/reset.html',
      controller: 'ResetCtrl'
    }).
    when('/new-password/:token',{
       templateUrl:'/templates/password-reset.html',
       controller:'PasswordResetCtrl'
    }).
    when('/mail-verify/:string',{
       templateUrl:'/templates/verfiy-email.html',
       controller:'verifyMailCtrl'
    }).
    //my class section
    when('/myclass', {
      templateUrl:'/templates/myclass.html',
      controller: 'MyclassCtrl',
      auth: true
    }).
    when('/myclass/:name', {
      templateUrl:'/templates/myclass.html',
      controller: 'MyclassCtrl',
      auth: true
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }).
  run(['$rootScope', '$location', 'Session', function ($rootScope, $location, Session) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
            var params = next.$$route;
            var path = $location.path();

           /* if(path=='/get-started'){
               Captcha.LoadCaptcha();
            }*/

            //Get user information
           if(path!='/logout'){
             Session.get_user().then(function (user) {
                if (user && !user.error) {
                   if( user.status =='security_questions' && path !== '/security-questions'){
                      $location.path('/security-questions');
                      event.preventDefault();
                      return;
                   }
                   else if(user.status != 'security_questions' && !user.security_questions.length){
                       $location.path('/security-questions');
                         event.preventDefault();
                      return;
                   }
                   else if( user.status =='course' && path.indexOf('myclass') > -1 ){
                         event.preventDefault();
                       return;
                   }
                }
                else if(!user && params && params.auth){
                    $location.path('/login');
                }
              });
            }
      });
  }]);
