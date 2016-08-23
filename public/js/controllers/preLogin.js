angular.module('myApp.controllers.preLogin', [])
  .controller('AppCtrl', function ($scope, $http) {

    $(document).on('click', '#menu-toggle',function() {
        $(this).toggleClass('close');
        $('.collapse').collapse('toggle');
    });

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  })
  .controller('headerCtrl', function ($scope, Session) {
    Session.get_user().then(function (data){
      if(data.first_name){
        $scope.userName=data.first_name;
      }
      $scope.user = data && data._id;
    });
  })
  .controller('paymentSuccessCtrl',function ($scope){

  })
  .controller('betaCtrl',function ($scope){

  })
  .controller('homepageCtrl', function ($scope) {

  })
  /*.controller('ChatBoxCtrl',function ($rootScope, Session, $scope, $location, PubNub){
    Session.get_user().then(function(user){
     if(!user.error)
      {
        $scope.userId   =  user._id;
        $scope.name = user.first_name + ' ' + user.last_name;
        $scope.channel  = 'mychannel123';
        $scope.messages = ['Welcome to ' + $scope.channel];

         if(!$rootScope.initialized){
            PubNub.init({
                subscribe_key: 'sub-c-bdbcec8a-5dc4-11e5-88e0-02ee2ddab7fe',
                publish_key: 'pub-c-b2d61999-0732-4777-9e7b-07cc02a06602',
                uuid:$scope.userId
            });
           $rootScope.initialized = true;
         }

         PubNub.ngSubscribe({
           channel: $scope.channel,
           callback: function(res) {


                   if(res.user_id==user._id){
                      $scope.me=true;
                      $scope.messages.push(res.message);
                      $('#chat-message').append('<div class = "by">You</div><div class="my-messasge" ng-show="me">'+res.message+'</div><div style="clear:both"></div>');
                   }
                   else{
                      $scope.me=false;
                      $scope.messages.push(res.message);
                      $('#chat-message').append('<div class = "by">'+res.user_name+'</div><div class="response-message" ng-show="!me">'+res.message+'</div><div style="clear:both"></div>');
                   }
                   $("#chat-message").animate({ scrollTop: $('#chat-message').height() }, "slow");


            }
        });

         // Create a publish() function in the scope
      $scope.publish = function() {
        PubNub.ngPublish({
          channel: $scope.channel,
          message:{user_id:$scope.userId, user_name:$scope.name, message:$scope.newMessage}
        });
           $scope.newMessage = '';
      };

      // Register for message events
      $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload){
        $scope.$apply(function() {
          $scope.messages.unshift(payload.message);
        });
      });

      // Register for presence events (optional)
      $rootScope.$on(PubNub.ngPrsEv($scope.channel), function(ngEvent, payload) {
        $scope.$apply(function() {
          $scope.users = PubNub.ngListPresence($scope.channel);
        });
      });

      // Pre-Populate the user list (optional)
      PubNub.ngHereNow({
        channel: $scope.channel
      });


       $scope.CloseChatBox=function(){
          $scope.HideChatBox=true;
       }
     }
    });
  })*/
  .controller('contactCtrl', function ($scope, User) {

    $scope.contact=function(){
       Helpers.LoadingIcon.Init();

         var user= angular.copy($scope.user);
         var valid= $scope.contactForm.$valid;
       if(valid){
           User.contact(user).then(function(res){
              Helpers.LoadingIcon.Stop();
                if(res && res.success){
                   ModalAlert.Success('An email has been sent to Hello Officer.',"Email Sent");
                }
           });
       }
    };

  })
  .controller('privacyAgreementCtrl', function ($scope) {

  })
  .controller('TandCCtrl', function ($scope) {

  })
  .controller('faqCtrl', function ($scope) {

  })
  .controller('sampleCtrl', function ($scope) {

  })
  .controller('sectionQuizExampleCtrl', function ($scope) {

  })
  .controller('helpPageCtrl', function ($scope) {

  })
  .controller('verfiyAccountCtrl', function ($scope, Session, User, $location) {
    $scope.genrateMonth=Calander.GetMonthsArray();
    $scope.genrateDays=Calander.GenrateDays();
    $scope.GenrateYears=Calander.GenrateYears();

    $scope.user = {};
    $scope.submit = function(){
      if($scope.verifyAccountForm.$valid){
        Session.get_user().then(function (user){
           var temp = new Date(user.birthdate);

           var month =temp.getMonth()+1;
           var day =temp.getDate();
           var year =temp.getFullYear();

           console.log(temp , month , day , year);

           var cond1 = user.dl_number == $scope.user.dl_number;
           var cond2 = month == $scope.user.month;
           var cond3 = day == $scope.user.day;
           var cond4 = year == $scope.user.year;

           console.log(cond1 , cond2 , cond3 , cond4);

           if(cond1 && cond2 && cond3 && cond4){
              ModalAlert.Success('You have successfully verified your account.','Account Verification');
              $location.path('/myclass/student-info');
           }
           else{
              ModalAlert.Error('Sorry the details you have entered is incorrect.','Account Verification');
           }

        });
      }
    };
  })
  .controller('profileCtrl',function ($scope, Session, User){

 Helpers.LoadingIcon.Init();

    Session.get_user().then(function (user){

      Helpers.LoadingIcon.Stop();
        if(user.certificateNumber==''){
          $scope.disableAll=false;
               if(!user || user.error){
                      return $location.path('/');
               }
              else{
                        $scope.data=user;
                  }
        }
        else
        {
          $scope.disableAll=true;
        }
    });

     $scope.submit = function(){

 if(!$scope.disableAll){

       Helpers.LoadingIcon.Init();

      var params = angular.copy($scope.data);
         User.update(params).then(function(){

               Helpers.LoadingIcon.Stop();

               ModalAlert.Success('Your details are successfully updated.','Updated');
         });
  }


     }

  })
  .controller('ResetCtrl', function ($scope, User) {
    $scope.btnDisabled=false;
    $scope.submit=function(){
      if(!$scope.email){
        return;
      }
       $scope.btnDisabled=true;
      User.resetPassword({email:$scope.email}).then(function(response){
          $scope.btnDisabled=false;
          if(response.error){
             ModalAlert.Error('Sorry, the email you entered is not registered with us.','Email not found');
            return;
          }
          ModalAlert.Success('An email has been sent to you with further instructions. Please check your mail.','Mail sent');
      });
    };

  })
  .controller('PasswordResetCtrl',function ($scope, $routeParams, $location, User){
     var token = $routeParams.token;
     $scope.Isdisabled=false;
     $scope.submit=function(){
      var pas=$scope.password;
       if($scope.password){
           $scope.Isdisabled=true;
           User.validateAndUpdate({token:token,password:pas}).then(function(res){
             $scope.Isdisabled=false;
            if(!res.user){
              ModalAlert.Error(res.message,'Password Cannot Be changed');
            }
            else{
              ModalAlert.Success(res.message,'Password changed');
              $location.path('/login');
            }

           });
       }
     };
  })
  .controller('verifyMailCtrl',function($location,$scope,$routeParams,User){
    var string =$routeParams.string;
    var data ={
         cond:{emailVerificationString:string},
         params:{email_verified:true,emailVerificationString:''}
    };
    if(string){
       Helpers.LoadingIcon.Init();
      User.verifyEmailAddress(data).then(function(res){
         Helpers.LoadingIcon.Stop();
           if(res.error==null && res.res==null){
            ModalAlert.Error("This token is not valid.","Invalid Token");
            $location.path('/');
           }
           if(res.error==null && res.res!=null){
            ModalAlert.Success("Thank you for verifying your email.");
             $location.path('/');
           }
           if(res.error!=null && res.res==null){
            ModalAlert.Error("There is an error while confirming your email.","Error");
             $location.path('/');
           }
      });
    }
  })
  .controller('GetStartedCtrl', function ($scope, $location, moment, User, $route) {
     Captcha.LoadCaptcha();
     $scope.myValue=false;
     $scope.siteKey="6LeBbxoTAAAAAGAGml3_iU_KTiU2i1-Cy8prS_ru";
     var secret="6LeBbxoTAAAAAPDaQEwYH9ms6cHj587ArfjTFuux";

    $scope.submit = function () {
      /*var valid = typeof userData!='undefined' && userData.first_name && userData.last_name && userData.email && userData.password;*/
       var valid = $scope.userRegistrationForm.$valid;
       var captchaString = $('[name=g-recaptcha-response]').val();
       var userData = angular.copy($scope.data);
       var captcha={ secret:secret,response:captchaString };
       var params = {userData:userData,captcha:captcha};

if( valid && typeof captchaString!='undefined' && captchaString!=''){

      User.create(params).then(function (data) {
        console.log('response',data);
        if(data && data.error=='captcha_error')
        {
           ModalAlert.Error("Captcha was incorrect.","Oops!");
           $route.reload();
        }
        if(data && data.error=='email_taken'){
          return ModalAlert.Error("This email is already registered with us.","Email Already Registered.");
        }
        if (data && data.user.status == 'security_questions' && !data.error) {

        ModalAlert.Success("You are successfully registered.<br/> Please answer a few security questions now.","Registration Successful");

          $location.path('/security-questions');

        }

      });
}
else{
             return;
}






      /*
      //regulate dates
      params.birthdate = moment.utc(
        params.birthdate_month + ' ' +
        params.birthdate_day + ' ' +
        params.birthdate_year
      ).valueOf();

      delete params.birthdate_month;
      delete params.birthdate_day;
      delete params.birthdate_year;
      */
    };


  })
  .controller('SecurityQuestionsCtrl', function ($scope, $location, User, Session) {

    var final_=[],
    security_questions = [
      {
        question: 'What color are your eyes?',
        answer: '',

      },
      {
        question: 'What is your favorite shape?',
        answer: ''
      },
      {
        question: 'What is your favorite body of water?',
        answer: ''
      },
      {
        question: 'What animal would you prefer to be?',
        answer: ''
      },
      {
        question: 'What kind of movies do you like most?',
        answer: ''
      },
      {
        question: 'How many children do you have?',
        answer: ''
      },
      {
        question: 'Which activity interests you most?',
        answer: ''
      },
      {
        question: 'What food would you rather eat?',
        answer: ''
      },
      {
        question: 'What is your natural hair color?',
        answer: ''
      },
      {
        question: 'Do you watch football?',
        answer: ''
      }
    ];
//console.log(jQuery.isEmptyObject(Session.user));
if(Session.user){
  Session.get_user().then(function(d){
    console.log(d);
    var n, k;
    if(d.security_questions.length > 0){
        var user_security_questions = d.security_questions;
        console.log('user security ',user_security_questions);
        for(n in security_questions){
          var question_to_check=security_questions[n].question,
           found_=false;

           for(k in user_security_questions){
             if(question_to_check==user_security_questions[k].question){
             final_.push(user_security_questions[k]);
             found_=true;
           }
         }
         if(!found_){
           final_.push(question_to_check);
          }
        }
      }
      else{
        final_=security_questions;
      }
     $scope.security_questions=final_;
    });
  }
  else{
    $scope.security_questions=final_;
  }


    $scope.submit = function () {
        var confirm = $scope.confirmCitation;
        if(!confirm){
           ModalAlert.Error("Please check the box to confirm you are person who received the citation and who will be completing this course.","Alert");
           return;
        }
      var params = {
        security_questions : angular.copy($scope.security_questions)
      };
      User.securityQuestions(params).then(function (data) {

        if (data.error) {
          return;
        } else if (data.status == 'course') {
          ModalAlert.Success("Great, you have answered all the security questions.<br>Now, you have access to the course.","Answers Saved Successfully");
          $location.path('myclass/dmv-disclaimer');
        }
        else
        {
            ModalAlert.Error("Answers saved. Though you need to answer all the security questions.","Security Questions");
        }
      });

    };
})
.controller('LoginCtrl', function ($location, $scope, User, $route, Session) {
  $scope.login = function () {
    User.login({
      email: $scope.email,
      password: $scope.password
    }).then(function (data) {
        if (!data || data && data.error) {
          $scope.error = true;
          return false;
        } else{
          Session.get_user().then(function(){
            $route.reload();
          })
        }
    });

  };

});


/*______________ was reported in 18% of distraction-related fatalities in America.*/