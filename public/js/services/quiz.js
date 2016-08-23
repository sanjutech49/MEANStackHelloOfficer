'use strict';

var app = angular.module('myApp.services.quiz', []);

app.factory('Quiz', function ($http, $q) {
  var quizService = {};

  quizService.getChapter = function(params) {
    var d = $q.defer();
    $http
      .post('/quiz/getChapter', {chapter : params})
      .success(function (res){
        d.resolve(res.data);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.getDefaultFinalExam = function(params) {
    var d = $q.defer();
    $http
      .post('/quiz/getDefaultFinalExam')
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.checkAnswer = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/checkAnswer', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.completeQuiz = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/completeQuiz', params)
      .success(function (res){
        d.resolve(res.data);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.reviewed = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/reviewed', params)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.getResult  = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/getResult', {chapter: params})
      .success(function (res){
        d.resolve(res.data);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.getAllResults  = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/getAllResults')
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };


   quizService.update = function (params) {
    var d = $q.defer();
    $http
      .post('/quiz/update', params)
      .success(function (res){
        d.resolve(res.data);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };


  quizService.isFinalExamPage = function($location){
    return ($location.path().indexOf('final-exam') )> -1?true:false;
  };

  quizService.getJsonFileData = function(filepath){

      var d = $q.defer();
    $http
      .get(filepath)
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;

  };

  quizService.resetQuiz =function(){
      var d = $q.defer();
    $http
      .post('/quiz/resetQuiz')
      .success(function (res){
        d.resolve(res);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;
  };

  quizService.saveUserFeedback = function(params){

      var d = $q.defer();
    $http
      .post('/survey/create',params)
      .success(function (res){
        d.resolve(res.data);
      })
      .error(function(status) {
        d.reject(status);
      });
    return d.promise;


  };

  return quizService;
});


/* Search Helper */
app.factory('SearchKeyword', function($http, $q) {
  var obj={
      bookContent:'#bookContent',
      SearchResults:'#SearchResults',
      bookPage_jscript:'bookPage',
      bookPage_jquery:'#bookPage',
      searchBox:'#keyword_',
      totalResults:0,
      SetDefault:function(){
        var that = this;
          $(that.SearchResults).text('');
          $(that.bookContent).children().find('a').css('background','none');
           that.totalResults=0;
      },
      chapters:[
        {  fileData:'/templates/i-recent-changes-reasons-for-traffic-laws.html',
           link:'i-recent-changes-reasons-for-traffic-laws'
        },
        {
          fileData:'/templates/ii-careless-driving-and-its-consequences.html',
          link:'ii-careless-driving-and-its-consequences'
        },
        {
          fileData:'/templates/iii-operator-responsibilities.html',
          link:'iii-operator-responsibilities'
        },
        {
          fileData:'/templates/iv-rights-and-responsibilities-of-a-pedestrian.html',
          link:'iv-rights-and-responsibilities-of-a-pedestrian'
        },
        {
          fileData:'/templates/v-driving-maneuvers.html',
          link:'v-driving-maneuvers'
        },
        {
          fileData:'/templates/vi-defensive-driving.html',
          link:'vi-defensive-driving'
        },
        {
          fileData:'/templates/vii-colision-avoidance.html',
          link:'vii-colision-avoidance'
        },
        {
          fileData:'/templates/viii-road-rage-aggressive-driving-and-avoiding-it.html',
          link:'viii-road-rage-aggressive-driving-and-avoiding-it'
        },
        {
          fileData:'/templates/ix-driver-distractions.html',
          link:'ix-driver-distractions'
        },
        {
          fileData:'/templates/x-the-vehicle.html',
          link:'x-the-vehicle'
        },
        {
          fileData:'/templates/xi-the-road.html',
          link:'xi-the-road'
        },
       ],
      FindInchapters:function(keyword, chapter){
         var d = $q.defer();
         var that = this;
         $http.get(chapter.fileData).then(function(response) {
            var data =response.data.toLowerCase();
            var check = data.search(keyword.toLowerCase()); 
             if(check>0){
                that.totalResults++;
                $(that.bookContent).children().find('a[data='+chapter.link+']').css('background','yellow');
                 d.resolve();
             }
             else{
               d.resolve();
             }

         });
        return d.promise;
      },
      FindInchapter:function(keyword){
        var that = this;
        var object = new FindInPage(that.bookPage_jscript);
            object.apply(keyword);
            return object.count;
      },
      ShowBookResults:function(keyword){
         var that = this;
         var chapters = that.chapters;
         chapters.forEach(function(chapter, ind, arr){
              that.FindInchapters(keyword,chapter).then(function(){
                  $(that.SearchResults).html('<b>Can be Found in '+that.totalResults+' chapters.</b>');
               });
         });
      },
      ShowChapterResults:function(keyword){
         var that = this;
         var results = that.FindInchapter(keyword);
         $(that.SearchResults).html('<b>Found '+results+' Results.</b>');
      },
      Init:function(keyword ){
        var that = this;
        that.SetDefault();
        if($(that.bookContent).is(':visible')){
                that.ShowBookResults(keyword);
        }
        else{
                 that.ShowChapterResults(keyword);
        }     
      }
  };

  return obj;
});
/******Search Helper End******/
