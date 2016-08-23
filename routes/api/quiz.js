var mongoose = require('mongoose'),
  Quiz = mongoose.model('Quiz'),
  Answer = mongoose.model('Answer'),
  Result = mongoose.model('Result'),
  User =  mongoose.model('User');

exports.list = function (req, res) {
  Quiz.find().exec(function (err, data) {
    if (err)
      return res.send(200, {error: err});
    else {
      return res.send(200, {data: data});
    }

  });
};

exports.getChapter = function (req, res) {
  var params = req.body;
  Quiz.findOne({ 'chapter' : params.chapter}, function (err, doc) {
    if (err)
      return res.send(200, {error: err});
    else
      return res.send(200, {data: doc});
  });
};

exports.getDefaultFinalExam = function (req, res) {

  Quiz.findOne({ 'isDefaultFinalExam' : true}, function (err, doc) {
    if (err)
      return res.send(200, {error: err});
    else
      return res.send(200, {data: doc});
  });


};

exports.checkAnswer = function (req, res) {
  var params = req.body;
  Quiz.findOne({'chapter': params.chapter},function (err, doc)
  {  
     if (err){ return res.send(200, {error: err}); }  
     else if (!doc){
       return res.send(200, {error: 'answer_not_found'});
     }
    else{
          var q = doc.questions,
          a = [],
          score=[],
          i,x,j,k;

         for(i = 0; i < q.length; i++) {
             for(x = 0; x < q[i].answer.length; x++) {
                 a.push(q[i].answer[x]);
             }
         }
         var wrongAnswers=[];
         var correctAnswers=[];
         var givenAns=[];
         for(j = 0; j < params.answers.length; j++){

             var cond=!(params.answers[j].correct);
             if((params.chapter=='FinalV1' || params.chapter=='FinalV2') && !params.answers[j].answer){
                cond = (params.answers[j] && !params.answers[j].answer);
              }
            /* if(cond && params.answers[j] && !params.answers[j].isBonusQuestion){*/
             if(cond && params.answers[j]){
                wrongAnswers.push(params.answers[j]);
             }
           

           for(k = 0; k < a.length; k++) {
              if(params.answers[j] && params.answers[j].answer == a[k].answer &&
                 params.answers[j].source == a[k].source)
               {
      
                  score.push(a[k].correct);
                   givenAns.push(a[k]);
                   if(a[k].correct){
                      correctAnswers.push(a[k]);
                   }
               }

            }
          }
         Result.create({
            user_id: req.user.email,
            chapter: params.chapter,
            score: score,
            answers: a,
            status: 'review',
            wrongAnswers:wrongAnswers,
            correctAnswers:correctAnswers,
            givenAns:givenAns
         },function (error, data){
          if (error)
            return res.send(200, {error: error});
          else
            return res.send(200, {data: data});
        }
      );
    }
  });

};
/*
exports.checkAnswer = function (req, res) {
  var params = req.body;
  Quiz.findOne({'questions.answer.source': params.source}, function (err, doc) {
    if (err)
      return res.send(200, {error: err});
    else if (!doc)
      return res.send(200, {error: 'answer_not_found'});
    else {
      var ans = false;
      var ques = false;
      var questionsLength = doc.questions.length || 0;
      if (doc.questions[params.question]) {
        for(var x = 0; x < doc.questions[params.question].answer.length; x++) {
          if (doc.questions[params.question].answer[x].source === params.source) {
            ans = doc.questions[params.question].answer[x];
            ques = doc.questions[params.question].source;
          }
        }
      }
      var correct = ans.correct ? true : false;
      if (!ans || !ques) {
        return res.send(200, {error: 'invalid_question'});
      }
      Result.findOne(
        { chapter: ans.chapter,
          status: 'start',
          user_id: req.user.email
        },
        function( e, result) {
          if (e)
            return res.send(200, {error: e});
          if (!result) {
            Result.create(
              {
                user_id: req.user.email,
                chapter: ans.chapter,
                score: [correct],
                answers: [ques],
                status: 'start'
              },
              function (error, docu) {
                if (error)
                  return res.send(200, {error: error});
                else
                  return res.send(200, {correct: correct});
              }
            );
          } else{
            if (result.answers.indexOf(ques) > -1) {
              return res.send(200, {error: 'already_answered'});
            }
            result.score.push(correct);
            result.answers.push(ques);
            result.status = questionsLength === result.answers.length ?
              'review' : 'start';
            console.log(questionsLength, result.answers.length);
            result.save(function (error, docu) {
              if (error)
                return res.send(200, {error: error});
              else
                return res.send(200, {result: docu});
            });
          }
        }
      );
    }
  });
};
*/

exports.completeQuiz = function (req, res) {
  var params = req.body;
  if (!req.user) {
    return res.send(200, {error: 'invalid_user'});
  }
  Result.findOne(
    {
      chapter: params.chapter,
      status: 'review',
      user_id: req.user.email
    },
    function( e, result) {
      if (e)
        return res.send(200, {error: e});
      if (!result) {
        return res.send(200, {error: 'result_missing'});
      } else {
        result.status = 'pass';
        result.save(function (error, docu) {
          if (error) {
            return res.send(200, {error: error});
          } else{
            var b = req.session.data.current_quizes || [];
            
            b.push(docu._id);
            User.findOneAndUpdate({_id: req.user._id}, {current_quizes: b}, function(er, user){
              if (er){
                return res.send(200, {error: er});
              } else {
                return res.send(200, {data: docu});
              }
            });
          }
        });
      }
    }
  );
};

exports.reviewed = function (req, res) {
  var params = req.body;
  if (!req.user) {
    return res.send(200, {error: 'invalid_user'});
  }
  Result.findOne(
    {
      chapter: params.chapter,
      status: 'review',
      user_id: req.user.email
    },
    function( e, result) {
      if (e)
        return res.send(200, {error: e});
      if (!result) {
        return res.send(200, {error: 'result_missing'});
      } else {
        result.status = 'fail';
        result.save(function (error, docu) {
          if (error) {
            return res.send(200, {error: error});
          } else{
            return res.send(200, {data: docu});
          }
        });
      }
    }
  );
};

exports.resetQuiz=function(req,res){

  Result.update({ user_id: req.user.email },{$set:{status:"start"}},{multi:true},function (err, data) {
    if (err)
      return res.send(200, {error: err});
    else {

             return res.send(200, {success: 'removed'});
      }

  });

  /*Result.where().findOneAndRemove({ user_id: req.user.email }, function (err, doc) {

    console.log('reset quiz',doc.length);
    console.log('reset',doc);
    if (err)
      return res.send(200, {error: err});
    else
      return res.send(200, {success: 'removed'});
  });*/

};

exports.updateAlternateFinalExam=function(req,res){

  if (!req.user) {
    return res.send(200, {error: 'invalid_user'});
  }
  Result.findOne({
        chapter: req.body.chapter,
        status: 'review',
        user_id: req.user.email  },
    function( e, result) {
      if (e)
        return res.send(200, {error: e});
      if (!result) {
        return res.send(200, {error: 'result_missing'});
      } else {
        result.status = 'pass';
        result.save(function (error, docu) {
          if (error) {
            return res.send(200, {error: error});
          } else{
            return res.send(200, {data: docu});
          }
        });
      }
    }
  );


};

exports.create = function (req, res) {
  var params = req.body;
  Quiz.create(params, function (err, data) {
    if (err)
      return res.send(200, {error: err});
    else
      data.save(function(e, d) {
        if (e)
          return res.send(200, {error: e});
        else
          return res.send(200, {data: d});
      });
  });
};

exports.remove = function (req, res) {
  var params = req.body;
  Quiz.where().findOneAndRemove({ _id : params._id }, function (err, doc) {
    if (err)
      return res.send(200, {error: err});
    else
      return res.send(200, {success: 'removed'});
  });
};

exports.update = function (req, res) {
  var params = req.body;
  Result.findOneAndUpdate(params ,{'status':'fail'}, function (err, doc) {
    if (err)
      return res.send(200, {error: err});

    else
      return res.send(200, {data: doc});
  });
};


exports.updateQuiz = function (req, res) {

var params = req.body;
  Quiz.findOneAndUpdate({_id:params._id},params, function (err, doc) {
    if (err)
      return res.send(200, {error: err});

    else
      return res.send(200, {data: doc});
  });

};

exports.getResult = function (req, res) {
    var params = req.body,
      q = req.session.data.current_quizes || [],
      r = false;
    for (var i = 0; i < q.length; i++) {
      if (q[i].chapter === params.chapter) {
        r = q[i];
      }
    }
    if (r) {
      return res.send(200, {data: r});
    } else {
      Result.findOne(
        { chapter: params.chapter,
          $or: [{status: 'pass', status: 'review'}],
          user_id: req.user.email
        },
        function (err, doc) {
        if (err)
          return res.send(200, {error: err});
        else if (!doc)
          return res.send(200, {data: 'no_result'});
        else
          return res.send(200, {data: doc});
        }
      );
    }
};

exports.getAllResults = function(req,res,next){

   Result.find(
        {
          user_id: req.user.email,
          status: 'pass'  
        },
        {
           chapter:1
        },
        function (err, doc) {
        if (err)
          return res.send(200, {error: err});
        else if (!doc)
          return res.send(200, {data: false});
        else
          return res.send(200, {data: doc});
        }
      );

};
