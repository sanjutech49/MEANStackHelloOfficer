angular.module('myApp.controllers.myClass', [])
  .controller('MyclassCtrl', function($location, $scope, $routeParams, User, Session, Quiz){

    $(document).on('click', '#menu-toggle', function (e){
      $(this).toggleClass('close');
      $('.navbar-collapse').collapse('toggle')
    });
      var on = $routeParams.name;
      $scope.child = {};
      var route = [
        'dmv-disclaimer',
        'curriculum-table-of-contents',
        'introduction',
        'i-recent-changes-reasons-for-traffic-laws',
        'quiz?q=i',
        //'quiz?q=test',
        'ii-careless-driving-and-its-consequences',
        'quiz?q=ii',
        'iii-operator-responsibilities',
        'quiz?q=iii',
        'iv-rights-and-responsibilities-of-a-pedestrian',
        'quiz?q=iv',
        'v-driving-maneuvers',
        'quiz?q=v',
        'vi-defensive-driving',
        'quiz?q=vi',
        'vii-colision-avoidance',
        'quiz?q=vii',
        'viii-road-rage-aggressive-driving-and-avoiding-it',
        'quiz?q=viii',
        'ix-driver-distractions',
        'quiz?q=ix',
        'x-the-vehicle',
        'quiz?q=x',
        'xi-the-road',
        'quiz?q=xi',
        'course-completion',
        'student-info',
        'student-info-confirm',
        'payment-processing',
        'final-exam',
        'course-evaluation',
        'certificate'              ];
      var isFinalExamPage_ = Quiz.isFinalExamPage($location);

      //show continue button on all quiz pages
      $scope.ContinueBtnDisabled=false;
      $scope.BackBtnDisabled=false;

         // Adding button toggle action
      if(isFinalExamPage_){
            $('#openBookToggle').show();
            $('[data-toggle="popover"]').popover();
            $('[data-toggle="popover"]').popover('toggle');
            setTimeout(function(){
              $('[data-toggle="popover"]').popover('toggle');
            }, 5000);
       }
      else{
            $('#openBookToggle').hide();
       }

       $('#openBookToggle , #closeBook').on('click', function () {
               if(isFinalExamPage_){
                     var sideDrawerHeight = $(window).height();
                    $('.side_drawer').css('height', sideDrawerHeight);
                     $('#openBook').toggleClass('open');
                 }
        });

      $scope.isDisabled=false;
      if (!on)
        on = 'curriculum-table-of-contents';
      $scope.myTemplate = '/templates/' +  on + '.html';


      var currentState = route.indexOf(on + location.search);

      $scope.$on('continueButton', function(event,index) {
          $scope.cont=index;
       });

      if (currentState < 0)
        $location.path('/myclass/' + route[0]);

      $scope.MessasgeOnContinueBtnClick="Please select 'Submit Quiz' in order to continue.";

$scope.next = function (){
      if(currentState==route.length-1){
          return;
       }
      if(!$scope.isDisabled){
          tkn=1;
          var loc = route[currentState +1];
          var qz=loc.split("=");
          console.log(qz);
          if(qz[1]!=undefined){
              Quiz.getResult(qz[1]).then(function (d){

                 if (d && d.status == 'pass' || (Session.user.finalExamCompletionDate!="" && isFinalExamPage_) ){
                       alert("SDfgsdf");
                       loc = route[currentState + 2];
                       $location.url('/myclass/' + loc);
                        User.update({class_status: route[currentState + 1]});
                 }
                 else{
                  alert("else part d.status!=pass");              
                        $location.url('/myclass/' + loc);
                         User.update({class_status: route[currentState + 1]});
                 }
              });
          }
          else{
            alert("else part qz !=defined");



//              var user;

// Session.get_user().then(function (data){
//           user=data;   
   


    // var wsUrl = "http://myserver/anysite/_layouts/myfolder/webservice1.asmx?op=Hello";
    // var wsUrl='/soap_test/TvccServiceImplService.wsdl';
    // var wsUrl = 'http://198.252.73.185//TvccServiceImplService.wsdl';

//     var wsUrl= '<?xml version="1.0" encoding="UTF-8"?><definitions name="TvccServiceImplService" targetNamespace="http://service.application.tvcc.dmv.ca.gov/" xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://service.application.tvcc.dmv.ca.gov/" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> \
//   <types> \
//     <xsd:schema>  \
//       <xsd:import namespace="http://service.application.tvcc.dmv.ca.gov/" schemaLocation="TvccServiceImplService_schema1.xsd"/> \
//     </xsd:schema> \
//     <xsd:schema> \
//       <xsd:import namespace="http://application.tvcc.dmv.ca.gov/" schemaLocation="TvccServiceImplService_schema2.xsd"/> \
//     </xsd:schema> \
//   </types> \
//   <message name="addCourseCompletion"> \
//     <part element="tns:addCourseCompletion" name="parameters"/> \
//   </message> \
//   <message name="addCourseCompletionResponse"> \
//     <part element="tns:addCourseCompletionResponse" name="parameters"/> \
//   </message> \
//   <message name="TvccAccessDeniedException"> \
//     <part element="ns1:TvccAccessDeniedException" name="fault" xmlns:ns1="http://application.tvcc.dmv.ca.gov/"/> \
//   </message> \
//   <message name="TvccValidationFailedException"> \
//     <part element="ns2:TvccValidationFailedException" name="fault" xmlns:ns2="http://application.tvcc.dmv.ca.gov/"/> \
//   </message> \
//   <message name="TvccServiceException"> \
//     <part element="ns3:TvccServiceException" name="fault" xmlns:ns3="http://application.tvcc.dmv.ca.gov/"/> \
//   </message> \
//   <portType name="TvccServiceImplDelegate"> \
//     <operation name="addCourseCompletion"> \
//       <input message="tns:addCourseCompletion"/> \
//       <output message="tns:addCourseCompletionResponse"/> \
//       <fault message="tns:TvccAccessDeniedException" name="TvccAccessDeniedException"/> \
//       <fault message="tns:TvccValidationFailedException" name="TvccValidationFailedException"/> \
//       <fault message="tns:TvccServiceException" name="TvccServiceException"/> \
//     </operation> \
//   </portType> \
//   <binding name="TvccServiceImplPortBinding" type="tns:TvccServiceImplDelegate"> \
//     <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/> \
//     <operation name="addCourseCompletion">  \
//       <soap:operation soapAction=""/>  \
//       <input> \
//         <soap:body use="literal"/> \
//       </input> \
//       <output> \
//         <soap:body use="literal"/> \
//       </output> \
//       <fault name="TvccAccessDeniedException"> \
//         <soap:fault name="TvccAccessDeniedException" use="literal"/> \
//       </fault> \
//       <fault name="TvccValidationFailedException"> \
//         <soap:fault name="TvccValidationFailedException" use="literal"/> \
//       </fault> \
//       <fault name="TvccServiceException"> \
//         <soap:fault name="TvccServiceException" use="literal"/> \
//       </fault> \
//     </operation> \
//   </binding> \
//   <service name="TvccServiceImplService">  \
//     <port binding="tns:TvccServiceImplPortBinding" name="TvccServiceImplPort"> \
//       <soap:address location="https://testxsg.dmv.ca.gov/tvcc_uat/tvccservice"/>  \
//     </port> \
//   </service> \
// </definitions>';

 //    var soapRequest= '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" \
 //    xmlns:ser="http://service.application.tvcc.dmv.ca.gov/"> \
 //    <soapenv:Header/> \
 //    <soapenv:Body> \
 //          <ser:addCourseCompletion> \
 //    <arg0> \
 //    <ccDate>"' +user.finalExamCompletionDate+ '"</ccDate> \
 //    <courtCd>"' +user.ticket_court+ '"</courtCd> \
 //    <dateOfBirth>"' +user.birthdate+ '"</dateOfBirth> \
 //    <dlNbr>"' +user.dl_number+ '"</dlNbr> \
 //                <firstName>"' +user.first_name+ '"</firstName>\
 //                <lastName>"' +user.last_name+ '"</lastName> \
 //                <modality>4T</modality> \
 //    <refNbr>"' +user.ticket_number+ '"</refNbr> \
 //    <userDto> \
 //    <password>Hello123</password> \
 //    <userId>molliekaiser@yahoo.com</userId> \
 //    </userDto> \
 //    </arg0> \
 //          </ser:addCourseCompletion> \
 //    </soapenv:Body> \
 //    </soapenv:Envelope>';

 //        $.ajax({
 //            type: "POST",
 //            url: wsUrl,
 //            contentType: "text/xml",
 //            dataType: "xml",
 //            data: soapRequest,
 //            success: processSuccess,
 //            error: processError,
 //            async:false
 //        });

 //        function processSuccess(data, status, req) {
 //            if (status == "success")
 //                // $("#response").text($(req.responseXML).find("HelloResult").text());
 //                console.log($(req.responseXML).text());
 //        }

 //        function processError(data, status, req) {
 //          console.log(data);
 //          console.log(req);
 //            console.log(req.responseText + " " + status);
 //        }  

 // });

               $location.url('/myclass/' + loc);
               User.update({class_status: route[currentState + 1]});
          }
      }
      else{

           if($scope.child.quiz && !$scope.child.done && !$scope.child.review){
            var q = angular.copy($scope.child.quiz.questions);
            var msg = GetMessageOnContinueBtn.OnQuiz(q,Quiz.isFinalExamPage($location));
            if(msg){
              $scope.MessasgeOnContinueBtnClick=msg;
            }
           }

           if($scope.child.security && $scope.child.done && !$scope.child.review){
              var security = angular.copy($scope.child.security);
              $scope.MessasgeOnContinueBtnClick=GetMessageOnContinueBtn.OnSecurityQuestion(security,Quiz.isFinalExamPage($location));

           }
        ModalAlert.Error($scope.MessasgeOnContinueBtnClick,"Whoops!");
      }
 };

$scope.prev = function () {
        if(currentState==0){
          return;
        }
        var loc = route[currentState - 1];
        var qz=loc.split("=");
          if(qz[1]!=undefined){
          loc = route[currentState - 2];
        }
        $location.url('/myclass/' + loc);
        User.update({class_status: route[currentState - 1]});

};

   Session.get_user().then(function (data){
         if(data.first_name){
           $scope.userName=data.first_name;
        }
        if(data.final_exam){
          userStatus=data.final_exam;
           if(userStatus=='paid'){
              var pos = route.indexOf('payment-processing');
                  if (pos > -1) {
                             route.splice(pos, 1);
                   }
           }
        }
    });

})
.controller('dmvDisclaimerCtrl',function($scope){
        $scope.$parent.BackBtnDisabled=true;
})
.controller('openBookCtrl',function($scope, $http, Quiz, SearchKeyword){
        SearchKeyword.SetDefault();
        $scope.ContentLink=false;

        $('.openChapter').on('click', function(){
           SearchKeyword.SetDefault();
           var page = $(this).attr('data');
           $scope.ContentLink='/templates/'+page+'.html';
            $('#bookContent').hide();
            $('#bookPage').show();
        });

        $('#TableOfContents').on('click',function(){
          SearchKeyword.SetDefault();
           $('#keyword_').val('');
           $('#bookPage').hide();
           $('#bookContent').show();
        });


    $scope.shadeIfKeyword=function(){
               var keyword = $.trim($('#keyword_').val());
               if(keyword){
                    var results = SearchKeyword.FindInchapter(keyword);
                   $(SearchKeyword.SearchResults).html('<b>Found '+results+' Results.</b>');
               }
    }

  })
.controller('searchBookCtrl',function ($scope, $http, SearchKeyword){
   SearchKeyword.SetDefault();
   $scope.searchKeyword=function(){
    SearchKeyword.SetDefault();
        if(!$scope.keyword){
            return false;
         }
      SearchKeyword.Init($scope.keyword);
   };

})
  .controller('TableOfContentsController',function ($location, $scope, Quiz, Session){

    Helpers.LoadingIcon.Init();
    $scope.route ={
        i:'/myclass/i-recent-changes-reasons-for-traffic-laws',
       ii:'/myclass/ii-careless-driving-and-its-consequences',
      iii:'/myclass/iii-operator-responsibilities',
       iv:'/myclass/iv-rights-and-responsibilities-of-a-pedestrian',
        v:'/myclass/v-driving-maneuvers',
       vi:'/myclass/vi-defensive-driving',
      vii:'/myclass/vii-colision-avoidance',
     viii:'/myclass/viii-road-rage-aggressive-driving-and-avoiding-it',
       ix:'/myclass/ix-driver-distractions',
        x:'/myclass/x-the-vehicle',
       xi:'/myclass/xi-the-road',
      xii:'/myclass/final-exam',
     xiii:'/myclass/course-evaluation'
      };
     $scope.chapters=[];

        Quiz.getAllResults().then(function(results){
               Helpers.LoadingIcon.Stop();
             if(results.error){
              console.log('error');
             }
             if(results.data){
                var results = results.data;
                   results.forEach(function(val,ind,arr){
                        $scope.chapters[val.chapter]=true;
                    });
             }
        });

       Session.get_user().then(function (data){
        console.log(data.finalExamCompletionDate);
          if(data.finalExamCompletionDate !=null){
             $scope.chapters['xii']=true;
          }
          if(data.course_eval){
             $scope.chapters['xiii']=true;
          }
       });


  })
  .controller('QuizController', function ($location, $scope, Quiz, User, Session, Helpers_) {
   Helpers.LoadingIcon.Init();
 Session.get_user().then(function(thisData){
    $scope.show = false;
    $scope.WhatNext=false;

    var parentScope = $scope.$parent;
parentScope.child = $scope;

    $scope.tryAlternateExamBtn=false;
    $scope.successMessage='Congratulations! You passed the quiz!';
    var WrongAnswers=[];
    var finalExamArr=[];
    var q = $location.search().q;
    var isCookie;
    var isFinalExamPage_ = Quiz.isFinalExamPage($location);


    if(isFinalExamPage_)
     {  Quiz.getDefaultFinalExam().then(function(fExam){
      var YourExamNo;
         if(thisData.finalExamCount==2){
              if(parseInt(fExam.data.chapter.replace ( /[^\d.]/g, '' ))==1){
                 YourExamNo=2;
              }
              else{
                YourExamNo=1;
              }
         }

         ExamTimer.Init(3600,"#timer-div",'#submit-final-exam');
         DisableFunctions.Init();

         $scope.$parent.ContinueBtnDisabled=true;
         $scope.successMessage='Congratulations! You passed the final exam!';
         var No_=Helpers_.GetCookie('tryTwo');
          No_ = YourExamNo;

         isCookie=No_!=""?true:false;
         if(isCookie){
            Helpers_.DeleteCookie('tryTwo');
         }

         if(No_){
            q = 'FinalV' + No_;
            $scope.review=false;
            $scope.isCompleted=false;
            $scope.done=false;
         }
         else
         {
           //Quiz.getDefaultFinalExam().then(function(fExam){
               var TotExam=2;
               var pickrandom=false;
               for(var i=1;i<=TotExam;i++){
                 finalExamArr.push(i);
               }

              if(fExam.data==null || fExam.error=='undefined'){
                   pickrandom=true;
              }
              else{
                    var  str1 = fExam.data.chapter.replace ( /[^\d.]/g, '' );
                     if(str1) {
                            ranNo=parseInt(str1);
                      }
                      else{
                           pickrandom=true;
                      }
              }

             if(pickrandom){
                 ranNo = (Math.floor(Math.random() * TotExam) + 1);
             }
             if(No_){ranNo=No_};

             q = 'FinalV' + ranNo;
             finalExamArr=Helpers_.DeleteElement(ranNo,finalExamArr);
           //});
         }
      });
    }


    var regex = /(\d+)/g;
    var els = document.getElementsByClassName('sectionIndex');
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = q;
    }
    $scope.selectedAnswers = [];
    User.test().then(function (data) {
      $scope.security = data.question;
    });
   var query_id=0;
Session.get_user().then(function (user_data){
  Quiz.getResult(q).then(function (d) {
    WrongAnswers=d.wrongAnswers;
    Quiz.getChapter(q).then(function (data) {
      if(data==null){ return ;}
     Helpers.LoadingIcon.Stop();
          var CorrectAns_=d.correctAnswers;
          var AllAns_=[];
          query_id=d._id;
          $scope.$parent.isDisabled=true;
          $scope.quizQuestions=data.questions;
          var a = 0,
          i = 0,
          indexes = false;
         if(user_data.status=='ended' && isFinalExamPage_){
            $scope.WhatNext=true;
            $scope.EndFinal=true;
            return;
         }
         if (d && d.status == 'pass' || (user_data.finalExamCompletionDate!=null && isFinalExamPage_) ) {
              $scope.isCompleted = true;
              $scope.$parent.isDisabled=false;
         }
        else if (d && d.status == 'review' && !isCookie)
         {
            indexes = [];
            for(i=0;i < d.score.length; i++) {
               if (!d.score[i]) {
                 indexes.push(data.questions[i]);
               }
               if(d.score[i]){
                  CorrectAns_.push(data.questions[i]);
               }
               AllAns_.push(data.questions[i]);
            }
           if(indexes.length == 0) {
                $scope.done = true;
                $scope.$parent.MessasgeOnContinueBtnClick="Please select 'Submit' in order to continue.";
            }
           else {
                 $scope.$parent.MessasgeOnContinueBtnClick="Please restart section.";
                 $scope.review = true;
           }
        }
        $scope.quiz = data;
        $scope.indexes = indexes;

        $scope.AllAns=AllAns_;
         $scope.IsCorrectAnswer = function(id){
                 return Helpers.CheckIfcorrect(id,CorrectAns_);
         };
    });
  });
});
     //function to convert integer 1 to a and so on
    $scope.indexChar = function (index) {
       return String.fromCharCode(97 + index);
    };

var required_ans_ =[];
$scope.submitQuiz = function ()
{
   $scope.temprat = angular.copy($scope.quiz.questions);
      var q = $scope.quiz.questions;
      var answers = [];
      for (var i = 0; i < q.length; i++) {
          if (!q[i].selectedAnswer) {

                if(Quiz.isFinalExamPage($location)){
                     q[i].selectedAnswer=q[i].answer[0];
                     q[i].selectedAnswer.answer='';
                      q[i].selectedAnswer.isBonusQuestion=q[i].isBonusQuestion;
                     answers.push(q[i].selectedAnswer);
                }
                else{
                  return false;
                }
           }
          else {
             if(Quiz.isFinalExamPage($location)){
                q[i].selectedAnswer.isBonusQuestion=q[i].isBonusQuestion;
              }
             answers.push(q[i].selectedAnswer);
           }
      }


      Helpers.LoadingIcon.Init();
 Quiz.checkAnswer({chapter: $scope.quiz.chapter,answers: answers}).then(function (data)
  {
     Helpers.LoadingIcon.Stop();
     var indexes = [], i;
     var CorrectAns=[];
     var AllAns = [];
         data = data.data;
     WrongAnswers=data.wrongAnswers;

     for(var l=0;l<data.givenAns.length;l++){
           required_ans_.push(data.givenAns[l]._id);
           if(data.givenAns[l].correct){
              CorrectAns.push(data.givenAns[l]);
           }
     }

    for(i=0;i < data.score.length; i++) {
          if (!data.score[i]) {
            indexes.push($scope.quiz.questions[i]);
          }

          if(data.score[i]){
               //CorrectAns.push($scope.quiz.questions[i].selectedAnswer);
               //console.log($scope.quiz.questions[i].selectedAnswer);
          }
     }

   AllAns=$scope.temprat;
     //indexes.length == 0
    if((Quiz.isFinalExamPage($location) && WrongAnswers.length<9 ) || (!Quiz.isFinalExamPage($location) && indexes.length == 0) )
    {
       if(Quiz.isFinalExamPage($location))
        {
          User.update({finalExamCompletionDate: new Date(),givenFinalExam:true}).then(function(res){
               $scope.isCompleted=true;
               $scope.$parent.isDisabled=false;
                //$scope.done = true;
              //ModalAlert.Success("Congratulations! You have passed this quiz. <br/> Now, please varify your identity by answering a random security question.");
          });
        }
        else
        {
          $scope.done = true;
          $scope.$parent.MessasgeOnContinueBtnClick="Please select 'Submit' in order to continue.";
              // ModalAlert.Success("Congratulations! You have passed this quiz. <br/> Now, please varify your identity by answering a random security question.");
        }
    }
  else
  {
    if(finalExamArr.length)
      {  $scope.review=true;
         $scope.tryAlternateExamBtn=true;
         //give second alternate final exam to user
         Helpers_.CreateCookie('tryTwo',finalExamArr[0],1);
         finalExamArr=Helpers_.DeleteElement(finalExamArr[0],finalExamArr);

          Helpers.LoadingIcon.Init();
         User.update({finalExamCount:2,givenFinalExam:true}).then(function(){
           Helpers.LoadingIcon.Stop();
                ModalAlert.Error("You have failed this version of final exam.<br>You have one more chance to pass by taking another version of final exam.",'Exam Failed');
         });
      }
    else
     {     //to reset all quizes
        if(Quiz.isFinalExamPage($location)){

          console.log('resetting all quiz');
              Helpers.LoadingIcon.Init();
             User.update({status:'ended'}).then(function(){
                   Quiz.resetQuiz().then(function(){
                          Helpers.LoadingIcon.Stop();
                              $scope.review = true;
                   });
             });

         }
        else{
               $scope.$parent.MessasgeOnContinueBtnClick="Please restart section.";
               $scope.review = true;
               $scope.$parent.BackBtnDisabled=true;
            }
      }
  }
  $scope.indexes = indexes;


  $scope.AllAns = AllAns;
  $scope.IsCorrectAnswer = function(id){
      return (Helpers.CheckIfcorrect(id,CorrectAns) && Helpers.ExistInArray(required_ans_,id));
   };


 });
};

  $scope.tryAlternateFinalExam = function(){
      window.location.reload();
  }

  $scope.showYellowIfwrong = function(id) {
    var result = false;

      for(var i=0;i<WrongAnswers.length;i++){
        if( (WrongAnswers[i]._id == id) && Helpers.ExistInArray(required_ans_,id)){
            result = true;
        }
      }
      return result;
   };



$scope.whatsNext = function(){
    Quiz.reviewed({chapter: $scope.quiz.chapter}).then(function (data){
          console.log('Display whats next area.');
          $scope.WhatNext=true;
    });
};

//restart method start
$scope.restart = function () {
  Quiz.reviewed({chapter: $scope.quiz.chapter}).then(function (data)
   {
     var cookie_set=Helpers_.GetCookie('tryTwo')!=""?true:false;
      if($scope.quiz.title.length){
         $scope.quiz.restart_section=Helpers.ConvertToSlug($scope.quiz.title);
       }

     /* if(!cookie_set && Quiz.isFinalExamPage($location)){
         $scope.WhatNext=true;
      }*/


      if (!$scope.quiz.restart_section) {
          $location.url('/myclass/curriculum-table-of-contents');
      }
      else{
            $location.url('/myclass/' + $scope.quiz.restart_section);
      }
   });
};
//restart method end

//submit method start
$scope.submit = function ()
{
  if ($scope.security && $scope.security.selectedAnswer) {
      return false;
  }
  User.check({id : $scope.security.id,answer: $scope.security.selected}).then(function (data)
   {
     var d = data.data;
     var message_to_show="You have answered the security question incorrectly. We weren't able to verify your indentity therefore your were logged out.<br>Please log back in to continue.";
     if (d && d === 'wrong_answer')
     {
       Quiz.getResult(q).then(function (d)
       {
         query_id=d._id;
         Quiz.update({_id: query_id}).then(function (result)
         {
             ModalAlert.Error(message_to_show,"Wrong Answer");
             User.logout();
             $location.path('/logout');
         });
       });
     }
     else if (d && d === 'correct')
     {
        Quiz.completeQuiz({chapter: $scope.quiz.chapter}).then(function (result) {
          if (result && result.status === 'fail') {
              ModalAlert.Error(message_to_show);
              User.logout();
             $location.path('/logout');
          }
         else{
              $scope.isCompleted = true;
              $scope.$parent.isDisabled=false;
            }
        });
      }
  });
};
//submit method end


}); /*user_get() end */


})
  .controller('studentInfoCtrl', function($location, $scope, Session, User) {


   $scope.$parent.ContinueBtnDisabled=true;
    $('#ticket_due_date').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0'
    });


    $scope.genrateMonth=Calander.GetMonthsArray();
    $scope.genrateDays=Calander.GenrateDays();
    $scope.GenrateYears=Calander.GenrateYears();


     $('#ticket_due_date').on('change',function(){
          var date = $(this).val();
          $scope.data.ticket_due_date=date;
    });

     $('#court').on('change',function(){
          var e = document.getElementById("court");
          var val = e.options[e.selectedIndex].value;
          var val_toint=parseInt(val, 10);
          $scope.data.ticket_court=val_toint;
          // console.log($scope.data.ticket_court);
    });

     $('#countyname').on('change',function(){
          $scope.courtcity=[];
          $scope.courtinfo=[];
          var e = document.getElementById("countyname");
          var val = e.options[e.selectedIndex].value;
          $scope.countynameselected=val;
          var obj={
            county_name : val,
          }
          User.get_CourtCity(obj).then(function (info) {
              for(var i in info.data)
              {
                  $scope.courtcity.push( info.data[i] );
              }
              $scope.courtcity.sort();                           
          });
    });

    $('#courtcity').on('change',function(){
          $scope.courtinfo=[];
          var e = document.getElementById("courtcity");
          var val = e.options[e.selectedIndex].value;
          var obj={
            county_name : $scope.countynameselected,
            court_city : val,
          }
          User.get_CourtInfo(obj).then(function (info) {
            console.log(info);
              for(var i in info.data)
              {
                  $scope.courtinfo.push({ 
                      countcode : info.data[i].count_code,
                      courtname : info.data[i].court_name
                  });
              }                           
          });
    });

      $scope.$watch("data.street",function handleFooChange(newValue, oldValue) {
         var streetaddr = '';
          if(newValue && (typeof newValue == 'object')){
             $scope.data.city=false;
             $scope.data.state=false
             $scope.data.zipcode=false;
             $scope.data.street=false;

             if(newValue.City){
                $scope.data.city=newValue.City;
             }
             if(newValue.State){
                $scope.data.state=newValue.State;
             }
             if(newValue.PostCode){
                $scope.data.zipcode=newValue.PostCode;
             }
             if(newValue.Unit){
               streetaddr = ' '+newValue.Unit;
             }
             if(newValue.Suburb){
               streetaddr = ' '+newValue.Suburb;
             }
             if(newValue.Suburb_2){
               streetaddr = ' '+newValue.Suburb_2;
             }
             if(newValue.BuildingName ){
               streetaddr =' '+newValue.BuildingName;
             }

             if(newValue.Street){
               $scope.data.street=newValue.Street;
             }
             else{
                if(streetaddr && streetaddr!=''){
                    $scope.data.street=streetaddr;
                }
             }
          }
      });


    $scope.init = function () {      

      $scope.courtcity=[]; 
      $scope.courtinfo=[]; 
      $scope.countyname=[];
      $scope.countynameselected;

      User.get_CountyName().then (function (user) {
        for(var i in user.data)
          {
              // console.log(user.data[i].count_code);
              $scope.countyname.push( user.data[i] );
          }
          $scope.countyname.sort();
          // console.log($scope.countyname);
      });

      $scope.$parent.isDisabled=true;
      Session.get_user().then (function (user) {
        $scope.data = {
          first_name: user.first_name,
          last_name:  user.last_name
        };
        if(user.street){$scope.data.street=user.street;}
        if(user.city){$scope.data.city=user.city;}
        if(user.state){$scope.data.state=user.state;}
        if(user.zipcode){$scope.data.zipcode=user.zipcode;}
        if(user.birthdate){
          //$scope.data.birthdate=Helpers.ConverToMDY(user.birthdate);
          var temp = new Date(user.birthdate);
               $scope.month=temp.getMonth()+1;
               $scope.day=temp.getDate();
               $scope.year=temp.getFullYear();
        }
        if(user.ticket_court){$scope.data.ticket_court=user.ticket_court;}
        if(user.ticket_number){$scope.data.ticket_number=user.ticket_number;}
        if(user.dl_number){$scope.data.dl_number=user.dl_number;}
        if(user.dl_type){$scope.data.dl_type=user.dl_type};
        if(user.dl_state){$scope.data.dl_state=user.dl_state;}
        if(user.ticket_due_date){
          $scope.data.ticket_due_date=Helpers.ConverToMDY(user.ticket_due_date);
        }

      });
    };
    $scope.submit = function () {
      $scope.data.birthdate=$scope.month+'/'+$scope.day+'/'+$scope.year;

      var params = angular.copy($scope.data),
        valid = $scope.studentInfoForm.$valid;
      if (!valid){
        return false;
      }
      User.update(params).then(function (data) {
        $scope.$parent.isDisabled=false;
        ModalAlert.Success("Your details have been successfully saved!","");
        $scope.$parent.next();
      });


    };
  })
.controller('studentInfoConfirmCtrl',function($location, $scope, Session, User){

  $scope.Edit = function(){
     $location.path('myclass/student-info');
  };

  $scope.Continue = function(){
     $scope.$parent.next();
  };

  $scope.init = function () {
      $scope.$parent.isDisabled=false;
      Helpers.LoadingIcon.Init();
      Session.get_user().then (function (user) {
         Helpers.LoadingIcon.Stop();
        $scope.data = {
          first_name: user.first_name,
          last_name:  user.last_name
        };
        if(user.street){$scope.data.street=user.street;}
        if(user.city){$scope.data.city=user.city;}
        if(user.state){$scope.data.state=user.state;}
        if(user.zipcode){$scope.data.zipcode=user.zipcode;}
        if(user.birthdate){
            $scope.data.birthdate = Helpers.ConverToMDY(user.birthdate);
        }
        if(user.ticket_court){$scope.data.ticket_court=user.ticket_court;}
        if(user.ticket_number){$scope.data.ticket_number=user.ticket_number;}
        if(user.dl_number){$scope.data.dl_number=user.dl_number;}
        if(user.dl_type){$scope.data.dl_type=user.dl_type};
        if(user.dl_state){$scope.data.dl_state=user.dl_state;}
        if(user.ticket_due_date){
          $scope.data.ticket_due_date=Helpers.ConverToMDY(user.ticket_due_date);
        }

      }).catch(function(){
           Helpers.LoadingIcon.Stop();
      });
  };

})
.controller('paymentCtrl',function($scope, $location, Payment, Session){
  Helpers.LoadingIcon.Init();
  $scope.$parent.ContinueBtnDisabled = true;
  $scope.submitFields = false;
  $scope.genrateMonth=Calander.GetMonthsArray();
  $scope.GenrateYears = Calander.GenrateForwardYears(25,true);
  MakeReadOnly("input.readonly");

  Payment.getPlans().then(function(response){
    Helpers.LoadingIcon.Stop();
      if(response){
         $scope.options = response;
      }
  });

  var sendPaymentReq = function(params, callback){
     Helpers.LoadingIcon.Init();
      Payment.chargeUser(params).then(function(response){
        Helpers.LoadingIcon.Stop();
        if(response.error==null && response.data!=null){
            ModalAlert.Success('Transaction successfully completed.');
            if(callback){
              return callback();
            }
            return $scope.$parent.next();
        }
        return ModalAlert.Error(response.error,"");
      });
  };

  var resubmitForm = function(params){
    Helpers.LoadingIcon.Init();
    Session.get_user().then(function(user){
      Helpers.LoadingIcon.Stop();
        if(user.final_exam == 'paid'){
           return sendPaymentReq(params,function(){
              $location.path('/payment-success');
           });
        }
        else{
          ModalAlert.Error('Please pay for course first',"Alert");
        }
      });
  };


  $scope.payment=function(){
    var params = angular.copy($scope.data);
    var valid = $scope.paymentForm.$valid;
      if (!valid || !params.payment_plan){
        $scope.submitFields=true;
        //ModalAlert.Error("Please Fill all required fields first.","");
        return false;
      }
     if(params.payment_plan){

           switch(params.payment_plan){
             case 'course':
                   sendPaymentReq(params);
             break;

             case'resubmit':
                   resubmitForm(params);
                   //$location.path('myclass/student-info');
             break;

             default:
              ModalAlert.Error("You have selected an invalid option.","Invalid Option");
             return false;
           }

     }

  };

})
.controller('certificateCtrl',function($scope,$location,Session,Helpers_,User,Survey_){
  Helpers.LoadingIcon.Init();
   $scope.cont=true;
   $scope.$parent.ContinueBtnDisabled=true;
   $scope.$emit('continueButton',$scope.cont);

 Session.get_user().then (function (user) {
  if(user.zipcode==""){
    $location.path('/myclass/student-info');
  }
  var certificateNumber=Helpers_.CertificateNumber(user);
  User.update({certificateNumber:certificateNumber}).then(function(data){

     Survey_.GetSurveyData().then(function(survey_data){
      var survey = survey_data.survey;
      var schoolCompletionDate;
     if(survey && !survey_data.error){
        schoolCompletionDate = Helpers.ConverToMDY(survey.course_completion_date);
     }else{
      schoolCompletionDate='Not Set';
     }
            var userData = {
                  certificateNo:certificateNumber,
                  name:user.first_name+" "+user.last_name,
                  addr:user.street+", "+user.city+", "+user.state+" "+user.zipcode,
                  dob:Helpers.ConverToMDY(user.birthdate),
                  issueCourt:user.ticket_court,
                  citation:user.ticket_number,
                  licenseNo:user.dl_number,
                  stateOfInsurence:user.dl_state,
                  schoolCompletionDate:schoolCompletionDate,
                  dueDate:Helpers.ConverToMDY(user.ticket_due_date)
            };

          User.saveUserCertificate({userData:userData}).then(function(res){
             Helpers.LoadingIcon.Stop();
               $scope.user=userData;
          });

     });
   });
 });

})
.controller('certificateBtnCtrl',function($scope, User){
   $scope.emailCertificateToUser=function(){
    Helpers.LoadingIcon.Init();
          User.emailCertificateToUser({}).then(function(res){
            Helpers.LoadingIcon.Stop();
             if(res && res.data!=null && res.error==null){
              ModalAlert.Success('Certificate is successfully send on your email id. Please check',"");
             }
             else{
               ModalAlert.Error('Oops, pdf file not send',"");
             }
          });
   }
})
  .controller('course_evaluationCtrl',function(Quiz,Session,$scope,User){
   $scope.$parent.isDisabled=true;
   $scope.$parent.ContinueBtnDisabled=true;
    Quiz.getJsonFileData('/data/evaluation-questions.json').then(function(data){

        $scope.survey={
          first_name:'',
          middle_name:'',
          last_name: '',
          school_name:'',
          school_license:'',
          course_completion_date:Helpers.ConverToMDY(new Date()),
          questions: data.questions
         }

    ExamTimer.Init(300,"#timer-div",'#submit-evaluation');
         $scope.save = function(){
              var params = angular.copy($scope.survey);
              var timeout= $('#submit-evaluation').attr('timeout');
              var cond_one =  params.first_name=='';
              var cond_two =  params.last_name=='';
              var cond_thr =  params.school_name=='';
              var cond_four =  params.school_license=='';
              var cond_fiv = params.course_completion_date=='';
              var cond = cond_one || cond_two || cond_thr || cond_four || cond_fiv;

              if(!timeout){
                 if(cond){
                    return;
                 }
              }

             Quiz.saveUserFeedback(params).then(function (data) {
                  if (data.error) {
                    ModalAlert.Error("data.error","Error");
                          return;

                   }
                  else{
                        $scope.$parent.isDisabled=false;
                         User.update({course_eval:true}).then(function(data){
                           ModalAlert.Success("Thanks for giving your valuable feedback","Details Saved");
                           $scope.$parent.next();
                         });
                   }
             });
         };
     });

  });

