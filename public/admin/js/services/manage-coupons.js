'use strict';

var app = angular.module('myApp.services.coupons', []);

app.value('version', '0.1');


app.factory('Coupons', function ($http, $q, Session) {
  var couponService = {};

  couponService.getCoupons=function(params){
    var d = $q.defer();
    $http
      .post('/coupons/getcoupons', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  couponService.createCoupon = function(params){
    var d = $q.defer();
    $http
      .post('/coupons/createcoupons', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  couponService.deleteCoupon = function(params){
    var d = $q.defer();
    $http
      .post('/coupons/deletecoupons', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  return couponService;
});


