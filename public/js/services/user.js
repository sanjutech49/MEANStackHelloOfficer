'use strict';

var app = angular.module('myApp.services.user', []);

app.value('version', '0.1');

app.factory('Session', function($http, $q) {
  var that = this;
    that.user =  {};

  var typofSt= typeof(Storage) != "undefined";

  that.get_user = function () {
    var d = $q.defer();
   /* if(typofSt && that.user!='undefined' && !$.isEmptyObject(that.user)){
        d.resolve(that.user);
    } 
    else {*/
      $http
        .post('/user/session')
        .success(function (res){
          
          if(!res.error){
            that.user = res;
              if (typofSt) {
                  sessionStorage.user=res;
               }
          }

          d.resolve(res);
        })
        .error(function(status) {
          d.reject(status);
        });
     /* }*/
      return d.promise;
    };

    that.logout = function () {
      that.user = {};
     /* delete sessionStorage.user;*/
    };

    that.update = function(cb) {

      $http.post('/user/session')
        .then(function(r) {

          if (r.data.error)
            return;
          that.user = r.data;

          /*if (typofSt) {
             sessionStorage.user=r.data;
          }*/

          if (cb)
            cb(r.data);
        });
    };

    return that;
});

app.factory('User', function ($http, $q, Session) {
  var authService = {};
  
  authService.get_CountyName = function () {
    var d = $q.defer();
    $http
      .post('/county/getCountyName')
      .success(function (res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.get_CourtCity = function (data) {
    var d = $q.defer();
    $http
      .post('/county/getCourtCity',data)
      .success(function (res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.get_CourtInfo = function (data) {
    var d = $q.defer();
    $http
      .post('/county/getCourtInfo',data)
      .success(function (res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.logout = function () {
    var d = $q.defer();
    $http
      .post('/user/logout')
      .success(function (res) {
        Session.logout();
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };
  authService.login = function (credentials) {
    var d = $q.defer();
    $http
      .post('/user/login', credentials)
      .success(function (res) {
        Session.update();
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };


  authService.resetPassword = function(userDetails) {
       var d = $q.defer();
    $http
      .post('/user/sendResetLink', userDetails)
      .success(function (res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

   authService.verifyEmailAddress = function(params) {
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

  

  authService.validateAndUpdate=function(details){
       var d = $q.defer();
    $http
      .post('/user/validateAndUpdate', details)
      .success(function (res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.isAuthenticated = function () {
    return (Session.data && Session.data.email) ? true : false;
  };

  authService.securityQuestions = function(params) {
    var d = $q.defer();
    $http
      .post('/user/securityQuestions', params)
      .success(function (res){
        Session.update();
        d.resolve(res.user);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.update = function(params) {
    var d = $q.defer();
    $http
      .post('/user/update', params)
      .success(function (res){
        Session.update();
        d.resolve(res.user);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.create = function (params) {
    var d = $q.defer();
    $http
      .post('/user/create', params)
      .success(function (res){
        Session.update();
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  //sercurity questions
  authService.test = function () {
    //get one question
    var d = $q.defer();
    $http
      .post('/securityQuestions/test', {})
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };
  authService.check = function (params) {
    //pass { id: number, answer: user selection}
    var d = $q.defer();
    $http
      .post('/securityQuestions/check', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.contact = function (params) {
    var d = $q.defer();
    $http
      .post('/user/contact', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.emailCertificateToUser = function (params){
    var d = $q.defer();
    $http
      .post('/user/emailCertificateToUser',params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  authService.saveUserCertificate = function(params){
    var d = $q.defer();
    $http
      .post('/user/saveUserCertificate',params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };



  return authService;
});

app.factory('Payment', function($http, $q) {
  var obj = {};

  obj.chargeUser = function(params) {
    var d = $q.defer();
    $http
      .post('/user/chargeUser',params)
      .success(function(res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  obj.getPlans = function(params) {
    var d = $q.defer();
    $http
      .post('/user/getPlans',params)
      .success(function(res) {
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  return obj;
});


app.factory('Survey_',function($http, $q){

var this_ = this;
var obj ={
   GetSurveyData:function(){
         var d = $q.defer();
    $http
      .post('/survey/getsurveydata')
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
   }
};
return obj;
});


app.factory('Helpers_', function($http, $q) {

var this_=this,
 obj={

Makeid: function (total_)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < total_; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
},


CertificateNumber:function(user){
var this_=this,
 string_=user.email+user.hashed_password+this_.Makeid(8),
 return_=0;
 if(string_.length){
  for (var n in string_){
       return_+=string_.charCodeAt(n);
   }
 }
return parseInt(return_+(new Date().getTime() / 1000));
},

DeleteElement:function(elm,array){

   var index = array.indexOf(elm);
        if (index > -1) {
            array.splice(index, 1);
         }
   return array;
},

CreateCookie:function(cname,cvalue,exdays){

    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
},

GetCookie:function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
},

DeleteCookie:function ( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
},

CheckCookie: function (cname) {
    return getCookie(cname)!=""?true:false;

  },


  };


return obj;



});

