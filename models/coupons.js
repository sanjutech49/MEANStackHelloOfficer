var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CouponSchema = new Schema ();

CouponSchema.add({
  coupon_code:{type: String, unique: true},
  coupon_amt:{type: String},
  valid_till: {type: Date},
});


mongoose.model('Coupon', CouponSchema);
