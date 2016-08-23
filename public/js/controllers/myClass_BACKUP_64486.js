angular.module('myApp.controllers.myClass', [])
  .controller('MyclassCtrl', function($location, $scope, $routeParams, User, Session){
      var on = $routeParams.name;

      Session.get_user().then(function (data){
         if(data.first_name){
           $scope.userName=data.first_name;
        }
      });
      $scope.isDisabled=false;
      if (!on)
        on = 'curriculum-table-of-contents';
      $scope.myTemplate = '/templates/' +  on + '.html';
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
        'final-exam',
        'course-evaluation',
        'certificate'
      ];
      var currentState = route.indexOf(on + location.search);
      if (currentState < 0)
        $location.path('/myclass/' + route[0]);
      $scope.next = function () {
        if(!$scope.isDisabled){

        var loc = route[currentState +1];
        $location.url('/myclass/' + loc);
        User.update({class_status: route[currentState + 1]});

      }

      else {
        ModalAlert.Error("Sorry, you can't continue.");
      }

      };
      $scope.prev = function () {
        var loc = route[currentState - 1];
        $location.url('/myclass/' + loc);
        User.update({class_status: route[currentState - 1]});
      };
  })
  .controller('QuizController', function ($location, $scope, Quiz, User, Session, Helpers_) {
    $scope.show = false;

<<<<<<< HEAD
      (function() {
        var isQuizPage = window.location.search.length > 0;
        var querySelector = document.querySelector.bind(document);
        var btnContinue = querySelector('.btnContinue');

        if (isQuizPage === true) {
          btnContinue.setAttribute('disabled', 'disabled');
        }
      })();
=======
    var finalExamArr=[];

>>>>>>> 8fe3566fee11cd8bf4e05cb3ea32033fb98c2485
    $scope.successMessage='Congratualations! You pass the quiz';

    var q = $location.search().q;

    if ($location.path().indexOf('final-exam') > -1) {
        var No_=Helpers_.GetCookie('tryTwo');
       
      $scope.successMessage='Congratualations!';
      var TotExam=2;

      for(var i=1;i<=TotExam;i++){
         finalExamArr.push(i);
      }

      var ranNo = (Math.floor(Math.random() * TotExam) + 1);
      if(No_){ranNo=No_};
      q = 'FinalV' + ranNo; 

       finalExamArr=Helpers_.DeleteElement(ranNo,finalExamArr);
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

    Quiz.getResult(q).then(function (d) {
      Quiz.getChapter(q).then(function (data) {

         $scope.$parent.isDisabled=true;

          $scope.quizQuestions=data.questions;
        console.log(d, data);
        var a = 0,
          i = 0,
          indexes = false;
        if (d && d.status == 'pass') {
          $scope.isCompleted = true;
          $scope.$parent.isDisabled=false;
      //Display message if user have already completed quiz
        $scope.successMessage='You have already completed this section';


        } else if (d && d.status == 'review') {
          indexes = [];
          for(i=0;i < d.score.length; i++) {
            if (!d.score[i]) {
              indexes.push(data.questions[i]);
            }
          }
          if (indexes.length === 0) {
            $scope.done = true;
          } else {
            $scope.review = true;
          }
        }
        $scope.quiz = data;
        $scope.indexes = indexes;
      });
    });
     //function to convert integer 1 to a and so on
    $scope.indexChar = function (index) {
       return String.fromCharCode(97 + index);
    };

    $scope.submitQuiz = function () {


      //console.log($scope.quiz);
      var q = $scope.quiz.questions,
        i,
        answers = [];
      for (i = 0; i < q.length; i++) {
        if (!q[i].selectedAnswer) {
          return false;
        } else {
          answers.push(q[i].selectedAnswer);
        }
      }


      Quiz.checkAnswer({
        chapter: $scope.quiz.chapter,
        answers: answers
      }).then(function (data) {
        data = data.data;
        var indexes = [], i;
        for(i=0;i < data.score.length; i++) {
          if (!data.score[i]) {
            indexes.push($scope.quiz.questions[i]);
          }
        }
        if (indexes.length === 0) {
          $scope.done = true;
          ModalAlert.Success("Congratulations! You have passed this quiz. <br/> Now, please varify your identity by answering a random security question.");

        } else {
             $scope.review = true;
           if(finalExamArr.length){
            //give second alternate final exam to user
              Helpers_.CreateCookie('tryTwo',finalExamArr[0],1);
             finalExamArr=Helpers_.DeleteElement(finalExamArr[0],finalExamArr);
             $location.reload(false); 
            
           }
           
        
           
               
        }
        $scope.indexes = indexes;
      });
    };
/*
    $scope.nextQuestion = function () {
      var answer = $scope.quiz.selectedAnswer;
      if (!answer)
        return;
      Quiz.checkAnswer({
        source: answer.source,
        question: answer.question
      }).then(function(data) {
        var l = answer.question + 1;
        if (l >= $scope.quiz.questions.length) {
          $scope.done = true;
        } else {
          $scope.show = answer.chapter + l;
        }
      });
    };
  */
    $scope.restart = function () {

        Quiz.reviewed({chapter: $scope.quiz.chapter}).then(function (data) {
<<<<<<< HEAD

=======
>>>>>>> 8fe3566fee11cd8bf4e05cb3ea32033fb98c2485
          if($scope.quiz.title.length){
            $scope.quiz.restart_section = Helpers.ConvertToSlug($scope.quiz.title);
          }

          if (!$scope.quiz.restart_section) {
            $location.url('/myclass/curriculum-table-of-contents');
          } else {
            $location.url('/myclass/' + $scope.quiz.restart_section);
          }
        });
    };

    $scope.submit = function () {
      if ($scope.security && $scope.security.selectedAnswer) {
        return false;
      }
      User.check({
        id : $scope.security.id,
        answer: $scope.security.selected
      }).then(function (data) {
        var d = data.data,
        message_to_show="Sorry, wrong answer. You have been logged out.<br>Please log in again to continue.";
        if (d && d === 'wrong_answer') {

          ModalAlert.Error(message_to_show,"Wrong Answer");

          $location.path('/logout');
        } else if (d && d === 'correct') {
          Quiz.completeQuiz({chapter: $scope.quiz.chapter}).then(function (result) {
            if (result && result.status === 'fail') {
              ModalAlert.Error(message_to_show);

              $location.path('/logout');
            } else {
              $scope.isCompleted = true;
              $scope.$parent.isDisabled=false;
              //$scope.$parent.next();

            }
          });
        }
      });
    };

  })
  .controller('studentInfoCtrl', function($location, $scope, Session, User) {

    $('#dob').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0'
    });
    $scope.init = function () {
      $scope.$parent.isDisabled=true;
      Session.get_user().then (function () {
        $scope.data = {
          first_name: Session.user.first_name,
          last_name: Session.user.last_name
        };
      });
    };
    $scope.submit = function () {
      var params = angular.copy($scope.data),
        valid = $scope.studentInfoForm.$valid;
      if (!valid){
        return false;
      }
      User.update(params).then(function (data) {
        $scope.$parent.isDisabled=false;
        ModalAlert.Success("Your details are saved sucessfully.<br/> Now you can continue taking your exam.");
        $scope.$parent.next();
      });


    };
  }).controller('certificateCtrl',function($location,$scope,Session,Helpers_,User){
   
       Session.get_user().then (function (user) {
          var certificateNumber=Helpers_.CertificateNumber(user);
          User.update({certificateNumber:certificateNumber}).then(function(data){
            
         
       $scope.user={
              certificateNo:certificateNumber,
              name:user.first_name+" "+user.last_name,
              addr:"street:"+user.street+" city:"+user.city+" state:"+user.state+" zip:"+user.zipcode,
              dob:user.birthdate,
              issueCourt:user.ticket_court,
              citation:user.ticket_number,
              licenseNo:user.dl_number,
              stateOfInsurence:user.dl_state

        };
             });

      });

  });
  /*
  controller('finalexamXCtrl', function ($location, $scope, $http) {
    $scope.next = function () {
      $location.path('/myclass/course-evaluation');
    };
    $http.get('/data/final-exam.json').
    success(function(data) {
      $scope.exams = data;
      console.log(data);
    });
    $scope.random = function() {
        return 0.5 - Math.random();
    };
  }).
*/
