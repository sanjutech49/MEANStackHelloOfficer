
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  //api = require('./routes/api'),
  mongoose = require('mongoose'),
  hbs      = require('hbs'),
  http = require('http'),
  https = require('https'),
  fs = require('fs'),
  path = require('path'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  Local = require('passport-local').Strategy,
  p3p = require('p3p');

var app = module.exports = express();
var MongoStore = require('connect-mongo')(session);
var mongoUri = 'mongodb://blue:Offic3r@54.187.205.36:27017/main';
var partial = require('express-partial');
//var mongoUri = 'mongodb://localhost:27017/main';
var connect = function () {
  mongoose.connect(mongoUri);
};
connect();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected to mongo");
});
db.on('disconnected', connect);

// add this to the top before all routes
function ensureSecure(req, res, next){
  if(req.secure){
    return next();
  };
  res.redirect('https://' + req.get('host') +req.url);
};

app.use(ensureSecure);

app.use(session({
    secret: 'jdjsdhfjkh@#$jfsdlk',
    store: new MongoStore({
      url: mongoUri,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}));

app.use(partial());

app.use(bodyParser.json());
app.use(cookieParser('notsosecretkey'));

//store session

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

//login passport stuff
var User = mongoose.model('User');
passport.use(new Local ({
    usernameField : 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    var options = {
      criteria: {email : email},
      select: 'name email hashed_password salt'
    };
    User.load(options, function (err, user) {
        if (err)
          return done(err);
        if(!user)
          return done(null, false, {message: 'invalid_username_password'});
        if (!user.authenticate(password)) {
          return done(null, false, {message: 'invalid_username_password'});
        }
        return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
/**
 * Configuration
 */

// all environments
hbs.registerPartials(__dirname + '/views/templates/partials/**/*.html');
app.set('port', 8080);
app.set('views', __dirname + '/views');

//app.set('view options', { layout: false });

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', hbs.__express);


/**
 * Routes
 */

// serve index and view partials
app.get('/', p3p(p3p.recommended),routes.index);

app.get('/admin/*', routes.admin);

function restrict (req, res, next) {
  if (req.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect('/login');
  }
}

app.get('/myclass/*', restrict, routes.index);
var Users = require('./routes/api/user');
var Quiz = require('./routes/api/quiz');
var SQ = require('./routes/api/securityQuestions');
var Survey = require('./routes/api/survey');
var Coupons = require('./routes/api/coupons');
var County = require('./routes/api/county');

/*admin use only*/

  app.post('/county/getCountyName', p3p(p3p.recommended),County.getCountyName);
  app.post('/county/getCourtCity', p3p(p3p.recommended),County.getCourtCity);
  app.post('/county/getCourtInfo', p3p(p3p.recommended),County.getCourtInfo);

  app.post('/user/getAllUsers', p3p(p3p.recommended),Users.getAllUsers);
  app.post('/user/SearchUser', p3p(p3p.recommended),Users.SearchUser);
  app.post('/user/updateThisUser', p3p(p3p.recommended),Users.updateThisUser);
  app.post('/user/deleteThisUser', p3p(p3p.recommended),Users.deleteThisUser);
  app.post('/user/adminResetUserPassword', p3p(p3p.recommended),Users.adminResetUserPassword);


  app.post('/coupons/getcoupons', p3p(p3p.recommended),Coupons.getCoupons);
  app.post('/coupons/createcoupons', p3p(p3p.recommended),Coupons.createCoupons);
  app.post('/coupons/deletecoupons', p3p(p3p.recommended),Coupons.deleteCoupons);
/* end */

app.post('/user/login', p3p(p3p.recommended),Users.login);
app.post('/user/session',p3p(p3p.recommended), Users.session);
app.post('/user/logout', p3p(p3p.recommended),Users.logout);
app.post('/user/create', p3p(p3p.recommended),Users.create);
app.post('/user/securityQuestions',p3p(p3p.recommended), Users.securityQuestions);
app.post('/user/update', p3p(p3p.recommended),Users.update);

app.post('/user/emailCertificateToUser', p3p(p3p.recommended),Users.emailCertificateToUser);
app.post('/user/saveUserCertificate', p3p(p3p.recommended), Users.saveUserCertificate);



//app.post('/new-password',Users.saveNewPassword);
app.post('/user/contact',Users.contact);
app.post('/user/validateAndUpdate',p3p(p3p.recommended),Users.validateAndUpdate);
app.post('/user/sendResetLink',p3p(p3p.recommended),Users.sendResetLink);
app.post('/user/chargeUser',p3p(p3p.recommended),Users.chargeUser);
app.post('/user/getPlans',p3p(p3p.recommended),Users.getPlans);

app.post('/quiz/create',p3p(p3p.recommended), Quiz.create);
app.post('/quiz/remove',p3p(p3p.recommended), Quiz.remove);
app.post('/quiz/update', p3p(p3p.recommended),Quiz.update);
app.post('/quiz/updateQuiz', p3p(p3p.recommended),Quiz.updateQuiz);
app.post('/quiz/reviewed',p3p(p3p.recommended), Quiz.reviewed);
app.get('/quiz/list', p3p(p3p.recommended),Quiz.list);
app.post('/quiz/getChapter',p3p(p3p.recommended), Quiz.getChapter);
app.post('/quiz/checkAnswer', p3p(p3p.recommended),Quiz.checkAnswer);
app.post('/quiz/completeQuiz',p3p(p3p.recommended), Quiz.completeQuiz);
app.post('/quiz/getResult',p3p(p3p.recommended), Quiz.getResult);
app.post('/quiz/getAllResults',p3p(p3p.recommended), Quiz.getAllResults);
app.post('/quiz/resetQuiz',p3p(p3p.recommended),Quiz.resetQuiz);
app.post('/quiz/getDefaultFinalExam',p3p(p3p.recommended),Quiz.getDefaultFinalExam);

app.post('/securityQuestions/list',p3p(p3p.recommended), SQ.list);
app.post('/securityQuestions/test',p3p(p3p.recommended), SQ.test);
app.post('/securityQuestions/check',p3p(p3p.recommended), SQ.check);

app.get('/survey/list', p3p(p3p.recommended),Survey.list);
app.post('/survey/create', p3p(p3p.recommended),Survey.create);
app.post('/survey/remove', p3p(p3p.recommended),Survey.remove);
app.post('/survey/getsurveydata',p3p(p3p.recommended), Survey.getSurveyData);

app.get('/api/login',p3p(p3p.recommended), function(req, res) {
   var params = req.query;
   if (!params.email || !params.password)
      res.send(200, {error : true});
    else if (params.email === 'user@gmail.com' && params.password === 'pass')
      res.send(200, {success : true });
    else
      res.send(200, {error : true});
});

// redirect all others to the index (HTML5 history)
app.get('*', p3p(p3p.recommended),routes.index);

/**
 * Start Server
 */

 // var CreateServer = function(){
 //    http.createServer(app).listen(app.get('port'), function () {
 //          console.log('Express server listening on port '+app.get('port')+' in '+app.get('env')+' mode');
 //    });
 // };

 // var CreateSslServer = function(options){

 //    https.createServer(options, app).listen(app.get('port'), function () {
          
 //          console.log('Starting https server');
 //          console.log('Express server listening on port '+app.get('port')+' in '+app.get('env')+' mode');
 //    });
 // };


// fs.stat('ssl/helloofficer.com.crt', function(err) {
// CreateServer();
// console.log(err)   ;
//  if(err == null) {
//         fs.stat('ssl/helloofficer.com.key', function(errCrt) {
// console.log(errCrt);
//            if(errCrt == null) {
//               var options = {
//                   key: fs.readFileSync('./ssl/helloofficer.com.key'),
//                   cert: fs.readFileSync('./ssl/helloofficer.com.crt')
//               };

//               CreateSslServer(options);
//            }
//           else{
//               CreateServer();
//            }
//         });
//     }
//     else{
//       CreateServer();
//     }
//  });


var options = {
  key: fs.readFileSync('ssl/helloofficer.com.key'),
  cert: fs.readFileSync('ssl/helloofficer.com.crt')
};

// Create an HTTP service.
http.createServer(app).listen(8080,'10.134.17.178');
console.log('Server running at http://10.134.17.178:8080/');
/*
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(8076,function(){
  console.log("HTTPs server");
});*/