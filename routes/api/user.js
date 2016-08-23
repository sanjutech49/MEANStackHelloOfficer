var mongoose = require('mongoose');
var passport = require('passport');
var async=require("async");
var crypto=require("crypto");
var nodemailer=require("nodemailer");
var User = mongoose.model('User');
var CouponMdl = mongoose.model('Coupon');
var TransactionMdl = mongoose.model('Transaction');
var request = require('request');
var Q = require('q');
var pdf = require('html-pdf');
var fs = require('fs');
var config= require('../../config/google.js');

var paymentProcess = require('../../modules/payment');
var plans = require('../../config/payment-plans')();

/*admin use only*/

exports.adminResetUserPassword = function(req,res){
    var userId = req.body.id;
    var newPassword = req.body.password;
    if(userId && newPassword){
      User.findOne({_id:userId}).exec(function(err,user){
         if(user==null || err){
             return res.send({data:null,error:'Sorry, user not found in database.'});
         }
        var salt_=User.schema.methods.makeSalt();
        var hash = User.schema.methods.encryptPassword(newPassword,salt_);
        user.hashed_password=hash;
        user.salt=salt_;
        user.resetPasswordToken="";
        user.resetPasswordExpires="";
        user.save(function(err) {
           res.send({data:true,error:null});
        });

      });
   }
   else{
      res.send({error:'Invalid User Id.',data:null});
   }
};

exports.getAllUsers =function(req,res){
  var params = req.body;
  User.find(params).exec(function (err, users){
        if(typeof users != "undefined"){
          return res.send({users:users,error:null});
        }
        else{
          return res.send({users:null,error:true});
        }    
  });
};

exports.SearchUser =function(req,res){
  var params = req.body.cond;
  User.find({$or:params}).exec(function (err, users){
        if(typeof users != "undefined"){
          return res.send({users:users,error:null});
        }
        else{
          return res.send({users:null,error:true});
        }    
  });

};


exports.updateThisUser =function(req,res){
  var Alldata = req.body;
  var condition = req.body.cond;
  var params = req.body.params;

  User.findOneAndUpdate(condition, params, function(err, doc){
  
      if (err!=null || typeof doc == "undefined"){
         return res.send({res:null,error:true});
      }
      else{
        return res.send({res:doc,error:null});
      }
  });

};

exports.deleteThisUser = function(req,res){
   var params=req.body;
    User.remove(params, function(err, result) { 
        if(result.result.ok === 1 && !err) {
          res.send({error:null,res:true});
        }
        else{
          res.send({error:err,res:null});
        }
    });
};
/*  end  */
exports.login = function (req, res) {
  passport.authenticate('local', function(err, user, message) {
    if (err) {
      return res.send(200,{error : err});
    }
    if (message) {
      return res.send(200,{error : message.message || 'invalid_username_password'});
    }
    if (!user) {
      return res.send(200, {error: 'invalid_username_password'});
    }
    req.logIn(user, function(error) {
      if (error) {
        return res.send(200,{error : error});
      }
      return res.send(200, {success: true});
    });
  })(req, res);
};



var getUniqueHash = function(){
   var current_date = (new Date()).valueOf().toString();
   var random = Math.random().toString();
   var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
   return hash; 
};

var sendConfirmationMail = function(mailOptions){
  var deferred = Q.defer();

  var smtpTransport = nodemailer.createTransport({
                  service: config.service,
                     auth: {
                             user: config.user,
                             pass: config.pass
                           }
       });
        smtpTransport.sendMail(mailOptions, function(err) {
            deferred.resolve(true);
        });
 return deferred.promise;

};


exports.contact =function(req,res){
  var params=req.body;
  var mailOptions = {
         to:config.contactMail,
         from: config.from,
         subject:'Contact Hello Officer',
         html:'<b>Email: </b>'+params.email+'<br/><b>Reason For Contact: </b>'+params.reasonForContact+'<br/><b>Comments: </b>'+params.comments,
         replyTo:params.email
       };

   sendConfirmationMail(mailOptions).then(function(){
       res.send({success:true});
   })
 
};



exports.create = function (req, res) {
 // var params = req.body;
 var allData = req.body;
 var params = allData.userData;
 var captcha = allData.captcha;
 var emailVerificationString = getUniqueHash();

 params.emailVerificationString = emailVerificationString;

 if(captcha.secret && captcha.response){
  var url = "https://www.google.com/recaptcha/api/siteverify?secret="+captcha.secret+"&response="+captcha.response;
   request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                 body=JSON.parse(body);
             if(body.success){
                           params.status = 'security_questions';
                           var user = new User (params);
                           user.save(function (err) {
                             if (err){
                                var e = false;
                                if (err.name == 'ValidationError') {
                                  for (field in err.errors) {
                                     e = err.errors[field].message;
                                  }
                                 }
                              return res.send(200,{error : e || err});
                             }
                           req.logIn(user, function (error) {
                            if (error)
                              return res.send(200, {error: error});
                            
                            else{
                              var link = "http://" +  req.headers.host + "/mail-verify/" + user.emailVerificationString;
                                 var mailOptions = {
                                     to:user.email,
                                     from: config.from,
                                     subject:'Email confirmation',
                                     html: "Hello <br/><br/> Please click <a href="+link+">here</a> to verify your email.<p>If this link doesn't work then please copy and paste following link in your browser's address bar.</p>"+link+" <br/><br/> Thanks<br/>Hello Officer Team"
                                  };
                             sendConfirmationMail(mailOptions).then(function(mailRes){
                                   return res.send(200, {user: user}); 
                             });
                            
                                     
                                }
                          });
                       });

             }
             else
             {
                return res.send(200, {error: 'captcha_error'});
             }
         }
        else{
          return res.send(200, {error: 'captcha_error'});
        }
   });

 }
 else{
  return res.send(200, {error:'captcha_error'});
 }
 
  
};

exports.securityQuestions = function (req, res) {
  var params = req.body;
 var all_ans=true;
    for(var index in params) { 
       if (params.hasOwnProperty(index)) {
           var questions = params[index];
           var all_ans=true;
           questions.forEach(function(Obj,index,arry){
              if(Obj.answer){
                 all_ans=all_ans && true;
               }
              else{
                  all_ans=all_ans && false;
               }
           });
      if(all_ans){
        params.status = 'course';
      }
        }
     }

  if (req.user) {
    User.findOneAndUpdate({email: req.user.email}, params, function(err, doc){
      if(all_ans){
        doc.status = 'course';
      }
      if (err!=null)
        return res.send(200, {error: err});

      else
        return res.send(200, {user: doc});
    });

  } else {
    res.send(200, {error : 'login_required'});

  }
};

exports.update = function (req, res) {
  var params = req.body;
  if (req.user) {
    User.findOneAndUpdate({_id: req.user._id}, params, function(err, doc){
      if (err)
        return res.send(200, {error: err});

      else
        return res.send(200, {user: doc});
    });

  } else {
    res.send(200, {error : 'login_required'});

  }
};

exports.logout = function (req, res) {
  req.logout();
  req.session.destroy();
  //return res.redirect('/');
  return res.send(200, {success: 'logout'});
};



exports.sendResetLink=function(req, res, next){

 var userEmail = req.body.email;
 if(userEmail){
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },

    function(token, done) {
      User.findOne({email:userEmail}).exec(function(err, user){
        if(err || !user){
          return res.send(200,{error:'No account with that email address exists.'});
         }
        else{ 
               user.resetPasswordToken = token;
               user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
               user.save(function(err) {
                    done(err, token, user);
               });
         }
      });
    },

    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
                  service: config.service,
                     auth: {
                             user: config.user,
                             pass: config.pass
                           }
       });
      var mailOptions = {
        to: user.email,
        from: config.from,
        subject:config.subject,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/new-password/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
      });
    }
  ],
   function(err) {
    if (err) return next(err);
    res.send({status:true,error:false});
   });
  }

else{
   res.send(200, {error: 'email_required'});
 }
 
};

exports.validateAndUpdate=function(req,res){


  var password = req.body.password;
  var token = req.body.token;
    User.findOne({resetPasswordToken:token}).exec(function(err,user){
       if(user==null || err){
         return res.send(200,{user:false,message:'Sorry, you have followed an invalid link.'});
       }
  
      if(user.resetPasswordExpires <= Date.now()) {  
        user.resetPasswordToken="";
        user.resetPasswordExpires="";
        user.save();
       return res.send(200,{user:false,message:'Sorry, this link is expired.'});

      }
   
     var salt_=User.schema.methods.makeSalt(),
     hash = User.schema.methods.encryptPassword(password,salt_);
  
     user.hashed_password=hash;
     user.salt=salt_;
     user.resetPasswordToken="";
     user.resetPasswordExpires="";

     
      user.save(function(err) {
          res.send(200,{user:true,message:'Your password is successfully changed.<br/> Please log in to continue.'});
       });
    });
};


exports.session = function (req, res) {
  if (req.isAuthenticated() && req.user){
    User.findOne({email: req.user.email},{hashed_password:0,salt:0})
      .populate('current_quizes')
      .exec(function (err, doc) {
        if (err)
          res.send(200, {error: err});
        else {
          req.session.data = doc;
          res.send(200, doc);
        }
    });
  } else
    res.send(200, {error : 'login_required'});
};


exports.saveUserCertificate = function(req,res){
  var userData  = req.body.userData;
  var myhost = 'http://'+req.headers.host;
  res.renderPartials({certificate: { user: userData, myhost:myhost }},function(error,html){

         if(error!=null){
              return res.send({data:null,error:true});
         }
         else{
               var options = { format: 'Letter' };
              pdf.create(html.certificate, options).toFile('./Certificates/'+req.user._id+'.pdf', function(err, doc) {
                       return res.send({data:true,error:null});
              }); 

         }
   });
      
};

exports.emailCertificateToUser=function(req,res){
   
  if(fs.statSync('./Certificates/'+req.user._id+'.pdf').isFile()){
      var mailOptions = {
        to:req.user.email,
        from: config.from,
        subject:'Certificate',
        text:'Hello, Please find your certificate in attachment',
        attachments: [{
                         filename:'certificate.pdf', 
                         path:'./Certificates/'+req.user._id+'.pdf',
                         contentType: 'application/pdf'
                     }]
      };

      sendConfirmationMail(mailOptions).then(function(){
           return res.send({data:true,error:null})
      });

         
    }
    else{
           return res.send({data:null,error:true})
    }

};

exports.getPlans = function(req, res){
    res.send(plans);
};

exports.chargeUser = function(req, res){
   var couponCode = req.body.coupenCode ? req.body.coupenCode.toString() : false;
   var response = {data:null,error:null};
   var paymentData = req.body;
  
   var payment_plan = req.body.payment_plan || false;
   var userPlan = plans[payment_plan] ? plans[payment_plan].chargeValue : false;
   paymentData.country = req.body.country ? req.body.country : 'USA';
   

   if(!userPlan){
      response.error = 'Server Error';
     return res.send(response);
   }

   paymentData.amount = userPlan; 

   var UpdateUser = function(){
      var params = {final_exam:"paid"};
      User.findOneAndUpdate({_id:req.user._id}, params, function(err, doc){
          response.data = true;
          res.send(response);
      });
   };

   var SaveTransaction = function(transaction){
     TransactionMdl.create({
                             user_id:req.user._id,
                             transaction_id:transaction.transactionId,
                             user_plan:transaction.data.payment_plan,
                             discount_allowed:transaction.data.discount,
                             payment_date:new Date()
     },function(err, transactionData){
        return UpdateUser();
     });
   };

   var callback = function(transaction, err){
     if(err!=null){
        console.log('err',err);
        response.error = err.message ? err.message : 'Server error';
        return res.send(response);
     }
     else{
        return SaveTransaction(transaction);
     }
   };

   if(couponCode){
      CouponMdl.findOne({ coupon_code: couponCode }).exec(function(err, doc){
        if (err || doc==null){
          console.log(err);
          var msg = 'Invalid coupon code';
          response.error = err ? (err.message || msg) : msg;
          return res.send(response);
        }
        else{
           return paymentProcess(paymentData, doc.coupon_amt, callback);
        }     
     });
   } 
   else {
    return paymentProcess(paymentData, 0 ,callback);
   }
  
};


