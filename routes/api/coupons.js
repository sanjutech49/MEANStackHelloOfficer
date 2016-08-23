var mongoose = require('mongoose');
var coupon = mongoose.model('Coupon');

exports.getCoupons=function(req,res){
  var response = {data:null,error:null};
    coupon.find(req.body).exec(function(err, coupens){
       if(!err && coupens){
          response.data= coupens;
       }
       else{
           response.error=true;
       }
       res.send(response);
    });
};

exports.createCoupons=function(req,res){
   var response = {data:null,error:null};
   var data = req.body;
   if(!data.coupon_code || !data.coupon_amt || !data.valid_till){
      response.error= true;
      return res.send(response);
   }
    coupon.create(data, function (err, coupens){ 
       if(!err && coupens){
          response.data= coupens;
       }
       else{
           response.error=true;
       }
       res.send(response);
    });
};

exports.deleteCoupons = function(req, res){
    var response = {data:null,error:null};
    if(!req.body._id){
       response.error= true;
       return res.send(response);
    }
    coupon.remove(req.body, function(err, result) { 
        if(result === 1 && !err) {
           response.data = true;
        }
        else{
          response.error = true;
        }
        res.send(response);
    });
};





