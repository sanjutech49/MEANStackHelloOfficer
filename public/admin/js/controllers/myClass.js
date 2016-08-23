function censor(censor) {
  var output = '';
  for (property in censor) {
    output += property + ': ' + censor[property]+'; ';
  }
  return output;
};

angular.module('myApp.controllers.main', ['myApp.services.coupons']).
  controller('AppCtrl', function ($scope, $http) {

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
  .controller('adminLoginCtrl',function ($location, $scope, User, $route, Session) {
     var elm=$('#email');
     if(elm.length){ elm.focus(); }
     

     $scope.AdminLogin=function(){
       var valid = $scope.adminLoginForm.$valid;
        if(valid){
                 User.login({ email: $scope.email,
                             password: $scope.password
                 }).then(function (data) {
                      console.log('data',data);
                    if (!data || data && data.error) {
                         $scope.error = true;
                         return false;
                     }
                    else{ 
                          Session.get_user().then(function(user){
                              if(user && user.admin){
                                  $location.path('/admin');
                              }
                            else{
                                  $scope.error = true;
                                   ModalAlert.Error('You are not admin','Error');
                                  return $location.path('/admin/logout');
                                 
                               }
                          });                      
                    }
                });
        }
     };
     //AdminLogin end

  })
.controller('adminHeaderCtrl', function ($scope, Session) {
  $scope.username=false;
  $scope.admin=false;
      Session.get_user().then(function (data) {
            if (data && data.admin) {
                $scope.username=data.first_name;
                $scope.admin=true;
            }
          });
  })
  .controller('homepageCtrl', function ($scope, $http, Quiz) {
  })
  .controller('quizCtrl', function ($scope, $http, Quiz) {
    $scope.quiz = {
      questions: []
    };
    Helpers.LoadingIcon.Init();
    Quiz.list().then(function (data){
       Helpers.LoadingIcon.Stop();
      $scope.quiz_list = data.data.data || [];
      console.log(data.data.data);
    });
    $scope.indexChar = function (index) {
       return String.fromCharCode(97 + index);
    };
    $scope.newQuestion = function () {
      var l = $scope.quiz.questions.length || 0;
      var q = {
        source: $scope.quiz.chapter + l,
        question: '',
        correct_answer: '',
        explanation: '',
        answer: []
      };
      $scope.quiz.questions.push(q);
    };
    $scope.removeQuestion = function (q) {
      var index = $scope.quiz.questions.indexOf(q);
      $scope.quiz.questions.splice(index, 1);
    };
    $scope.newAnswer = function (q) {
      var l = q.source;
      var a = {
        source: l,
        chapter: $scope.quiz.chapter,
        correct: false,
        idx: l,
        answer: ''
      };
      q.answer.push(a);
    };
    $scope.removeAnswer = function (q, a) {
      var index = q.answer.indexOf(a);
      q.answer.splice(index, 1);
    };
    $scope.clear = function () {
      var id = $scope.quiz._id;
      $scope.quiz = {
        questions: []
      };
      if (id)
        $scope.quiz._id = id;
    };
    $scope.save = function () {
      var result = angular.copy($scope.quiz);

      console.log('result',result);
      $scope.loader = true;
      /*
     for(var i =0;i<result.questions.length; i++) {
      for(var x =0; x<result.questions[i].answer.length; x++) {
        result.questions[i].answer[x].source = result.questions[i].source;
      }
     }
     console.log(result);
     */
      if (result._id){
        Quiz.update(result).then(function (data) {
          setTimeout (function () {
            $scope.loader = false;
            $scope.$apply();
          }, 3000);
        });
      }
      else{
        Quiz.create(result).then(function (data) {
          $scope.quiz_list.push(data.data);
          setTimeout (function () {
            $scope.loader = false;
            $scope.$apply();
          }, 3000);
        });
       }
    };
    $scope.edit = function (ll) {
      $scope.quiz = ll;
      $scope.showCreate = true;
    };
    $scope.create = function () {
      $scope.showCreate=true;
      $scope.quiz = {
        questions: []
      };
    };
    $scope.remove =  function (ll) {
      Quiz.remove(ll._id).then(function (data) {
        var index = $scope.quiz_list.indexOf(ll);
        $scope.quiz_list.splice(index, 1);
      });
    };

  })
.controller('manageUsersCtrl', function ($scope, Admin, $route, $location) {
 
  $scope.displayAllusers=true;
  $scope.displayUserArea=false;

  var recordsOnSinglePage = 15;
  var chunks ;

  $scope.recordNo=[];
      Helpers.LoadingIcon.Init();
    Admin.getAllUsers({}).then(function(res){
         Helpers.LoadingIcon.Stop();
          HandleUsers(res);
    });

/*local functions*/
HandleUsers = function(res){
  $scope.displayAllusers=true;
  $scope.displayUserArea=false;

   if(res.error==null && res.users!=null){
            var records = res.users.length;
            chunks = Helpers.findNoOfchunks(recordsOnSinglePage,records);
            
            SetFirstPage(records);

               $scope.chunks = chunks;
               $scope.users = res.users;      
   }
  else{
       ModalAlert.Error("Something went wrong","Error");
  }

};

SetFirstPage = function (records){
   if(records){
      for(var i=0;i<records;i++){
         if(i<recordsOnSinglePage){
            $scope.recordNo.push(true);
         }
         else{
           $scope.recordNo.push(false);
         }        
      }
   }
}

HideAllRecords = function (){
    $scope.recordNo.forEach(function(val,ind,arr){
           $scope.recordNo[ind]=false;
    });
}

/*local functions area end*/

/*scope functions area*/
$scope.Search = function(){
  var keyword = $scope.keyword;
  if(keyword){
     Helpers.LoadingIcon.Init();
       Admin.SearchUser({cond:[{first_name:keyword},{last_name:keyword},{email:keyword}]}).then(function(res){
            Helpers.LoadingIcon.Stop();
            HandleUsers(res);
       }); 
  }

};

$scope.goToPageNo = function(pageNo){
  var start=0;
   if(pageNo){
       start=pageNo*recordsOnSinglePage;
   }

   var end=start+recordsOnSinglePage;
    HideAllRecords();
   for(var i=start;i<end;i++){
       $scope.recordNo[i]=true;
    }
}
/* angular edit user function which will work on admin users page*/
    $scope.EditUser = function(id){
       Helpers.LoadingIcon.Init();
       Admin.getAllUsers({_id:id}).then(function(res){
         Helpers.LoadingIcon.Stop();
          if(res.error==null && res.users!=null){
               $scope.user = res.users[0];

                $scope.displayAllusers=false;
                $scope.displayUserArea=true;
          }
          else{
            ModalAlert.Error("Something went wrong","Error");
          }

       });     
    };

    $scope.DeleteUser = function(id){

       if(confirm("Are you sure want to delete this user?")){
           Helpers.LoadingIcon.Init();
           Admin.deleteThisUser({_id:id}).then(function(res){
            Helpers.LoadingIcon.Stop();
             if(res.error==null && res.res!=null){
              ModalAlert.Success("Successfully Deleted","User Deleted");
              $route.reload();
             }
             else{
              ModalAlert.Error("There is an error while deleting","Not Deleted");
             }

           });    
       }
    };

/*angular back button function which will work on admin users page for particular user */
    $scope.Back = function(){
           $route.reload();
    };

  /*angular function to update user's information */
    $scope.Update = function(id){
        var params = angular.copy($scope.user);
          Helpers.LoadingIcon.Init();
        Admin.updateThisUser({cond:{_id:id},params:params}).then(function(res){
              Helpers.LoadingIcon.Stop();
              if(res.res != null && res.error==null){
                 ModalAlert.Success('Users Information successfully updated','Updated Successfully');
              }
              else{
                 ModalAlert.Error("Changes are not saved.","Not Updated");
              }
        });   
    };

    $scope.GoForDetails= function(id){
         $location.path('/admin/user/'+id);
    };
/*scope functions area end*/

 
  }).
controller('editUserCtrl',function($scope, $routeParams, Admin){
  var user_id = $routeParams.user_id;
  var finalExamCompletionDate;

  $scope.genrateMonth=Calander.GetMonthsArray();
  $scope.genrateDays=Calander.GenrateDays();
  $scope.GenrateYears=Calander.GenrateYears();

  $scope.totalAnswers=[];

   if(user_id){ 
     Helpers.LoadingIcon.Init();
     Admin.getAllSecurityQuestions().then(function(questions){
            questions.questions.forEach(function(val,ind,arry){
                  $scope.totalAnswers[ind] = val.answers;
            });
       Admin.SearchUser({cond:[{_id:user_id}]}).then(function(res){
            Helpers.LoadingIcon.Stop();
            if(res.users!=null && res.error==null){
                $scope.options=true;

                if(res.users[0].ticket_due_date){
                  res.users[0].ticket_due_date = Helpers.ConverToMDY(res.users[0].ticket_due_date);
                }

                if(res.users[0].birthdate){
                   var temp = new Date(res.users[0].birthdate);
                    $scope.month=temp.getMonth()+1;
                    $scope.day=temp.getDate();
                    $scope.year=temp.getFullYear();
                }
                
                if(res.users[0].class_status){
                   var qz=res.users[0].class_status.split("=");
                   if(qz[1]!=undefined){
                      $scope.classStatus = 'Quiz of Chapter No '+qz[1];
                   }
                   else{
                     $scope.classStatus = res.users[0].class_status;
                   }
                }

                if(res.users[0].finalExamCompletionDate==''){
                      finalExamCompletionDate = new Date();
                }
                else{
                      finalExamCompletionDate = res.users[0].finalExamCompletionDate;
                }
               $scope.myelemnte=res.users[0].finalExamCompletionDate;

               res.users[0].security_questions.forEach(function(val,ind,arry){
                    if(val && val!=null){
                       res.users[0].security_questions[ind].answer=val.answer.toLowerCase(); 
                   }             
               });


                $scope.user=res.users[0];
            }
            else{
              ModalAlert.Error("Sorry, user not found","");
            }
       }); 
      });
  }

var hideAll = function(){
     $scope.userInfoArea=false;
     $scope.securityQuestionsArea=false;
     $scope.options=false;
     $scope.passwordArea=false;
      $scope.ExamDetailsArea=false;
}


  var showArea = function(value){
     hideAll();
     switch (value) {
       case 'userInfo':
              $scope.userInfoArea=true;
         break;
       case 'securityQuestions':
              $scope.securityQuestionsArea=true;
         break;
       case 'ResetPassword':
              $scope.passwordArea=true;
         break;
       case 'ExamDetails':
              $scope.ExamDetailsArea=true;
         break;
 
      default:
           return;
        break;
     }
  };




  $scope.SwitchPage= function(page){

     var userData = angular.copy($scope.user);
     if(userData){
        userData=undefined;
         showArea(page);
      }

  }

  $scope.Back = function(value){
     hideAll();
    switch (value) {
       case 'userMenu':
            $scope.options=true;
        break;
       default:
           return;
        break;
     }
  };

 $scope.ChangeGrade = function(value){
      if(value=='Fail'){
      $scope.myelemnte='';
     }
   if(value=='Pass'){
      $scope.myelemnte = finalExamCompletionDate;
   }
 };

  $scope.Update = function(id){
     $scope.user.finalExamCompletionDate=$scope.myelemnte;
    if($scope.month && $scope.day && $scope.year){
        $scope.user.birthdate=$scope.month+'/'+$scope.day+'/'+$scope.year;        
    }
     

        var params = angular.copy($scope.user);
          Helpers.LoadingIcon.Init();
        Admin.updateThisUser({cond:{_id:id},params:params}).then(function(res){
              Helpers.LoadingIcon.Stop();
              if(res.res != null && res.error==null){
                 ModalAlert.Success('Users Information successfully updated','Updated Successfully');
              }
              else{
                 ModalAlert.Error("Changes are not saved.","Not Updated");
              }
        });   
  };

  $scope.ResetPassword = function(userId){ 
      var newPassword = angular.copy($scope.userNewPassword);
      var params = { security_questions:[]};
      if(newPassword && userId){
         Helpers.LoadingIcon.Init();
         Admin.ResetUserPassword({id:userId,password:newPassword}).then(function(res){

             Admin.updateThisUser({cond:{_id:userId},params:params}).then(function(){
              Helpers.LoadingIcon.Stop();
                 if(res && res.data!=null){
                   ModalAlert.Success('Users Password Changed Successfully.',"");
                 }
                 else{
                    ModalAlert.Error(res.error,"");
                 }
             });

         });
      }
  };

})
.controller('manageCouponsCtrl',function($scope, $routeParams, Admin, Coupons){
   $scope.DisplayCouponArea=true;

   var Init = function(){
      $scope.couponData = {};
      $scope.genrateMonth=Calander.GetMonthsArray();
      $scope.genrateDays=Calander.GenrateDays();
      $scope.GenrateYears=Calander.GenrateForwardYears(10); 
      $scope.month = false;
      $scope.day = false;
      $scope.year = false;
   }
   
   Init();

    
    Admin.getAllUsers({}).then(function(res){
          $scope.users=res.users;
    });
  
   var UpdateCouponList = function(){
     Helpers.LoadingIcon.Init();
     Coupons.getCoupons({}).then(function(coupons){
       Helpers.LoadingIcon.Stop();
       if(coupons.error!=null){
          ModalAlert.Error('Oops Something went wrong.',""); 
       }
       else{
          $scope.coupons= coupons.data;
       }
     });
   }
   UpdateCouponList();

   $scope.DisplayCreateCoupenArea=function(){
      $scope.createNewCouponArea=true;
      $scope.DisplayCouponArea=false; 
   };

   $scope.ListCoupen=function(){
      $scope.createNewCouponArea=false;
      $scope.DisplayCouponArea=true; 
   };

   $scope.CreateCoupon=function(){
      $scope.couponData.valid_till=$scope.month+'/'+$scope.day+'/'+$scope.year;
      var auth = $scope.couponData;
      if(auth.valid_till && auth.coupon_code && auth.coupon_amt && auth.valid_till){
         Helpers.LoadingIcon.Init();
         Coupons.createCoupon(auth).then(function(response){
          Helpers.LoadingIcon.Stop();
          Init();
           if(response.error!=null){
              ModalAlert.Error('Oops Something went wrong.',""); 
           }
           else{
                UpdateCouponList();
                $scope.ListCoupen();
                ModalAlert.Success('Coupon successfully created.',"");
           }
         });
      }
      else{
        return;
      }
   };
   
   $scope.DeleteCoupon=function(couponId){
      if(confirm("Are you sure want to delete this coupon?")){
         Helpers.LoadingIcon.Init();
        Coupons.deleteCoupon({_id:couponId}).then(function(response){
           Helpers.LoadingIcon.Stop();
           if(response.error!=null){
              ModalAlert.Error('Oops Something went wrong.',""); 
           }
           else{
                UpdateCouponList();
                ModalAlert.Success('Coupon successfully deleted.',"");
           }
        });
      }
   };

});
