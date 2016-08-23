var mongoose = require('mongoose');
var county = mongoose.model('County');

exports.getCountyName=function(req,res){
  var response = {data:null,error:null};
    county.distinct("county_name",req.body,function(err, countys){
       if(!err && countys){
          response.data= countys;
       }
       else{
           response.error=true;
       }
       res.send(response);
    });
};

exports.getCourtCity =function(req,res){
  var params = req.body;
  county.distinct("court_city",params,function (err, data){
        if(typeof data != "undefined"){
          return res.send({data:data,error:null});
        }
        else{
          return res.send({data:null,error:true});
        }    
  });
};

exports.getCourtInfo =function(req,res){
  var params = req.body;
  county.find(params).exec(function (err, data){
        if(typeof data != "undefined"){
          return res.send({data:data,error:null});
        }
        else{
          return res.send({data:null,error:true});
        }    
  });
};