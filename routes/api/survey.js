var mongoose = require('mongoose'),
  Survey = mongoose.model('Survey');

exports.list = function (req, res) {
  Survey.find().exec(function (err, data) {
    if (err)
      return res.send(200, {error: err});
    else {
      return res.send(200, {data: data});
    }

  });
};
exports.create = function (req, res) {
  var params = req.body;
  if (!req.user) {
    return res.send(200, {error: 'login_required'});
  }
  params.user_id = req.user.email;
  Survey.create(params, function (err, data) {
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
  Survey.where().findOneAndRemove({ _id : params._id }, function (err, doc) {
    if (err)
      return res.send(200, {error: err});
    else
      return res.send(200, {success: 'removed'});
  });
};


exports.getSurveyData = function (req, res) {
    Survey.findOne({user_id:req.user.email}).exec(function(err, data){
        if(err || !data){
              return res.send(200,{error:'No data'});
         }
        else{ 
               return res.send(200,{survey:data});  
         }
   });
}
