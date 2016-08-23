var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema ();

TransactionSchema.add({
  user_id: { type: String},
  transaction_id: {type: String},
  user_plan : {type: String},
  discount_allowed: {type:String},
  payment_date:{type: Date,default:''}
});

mongoose.model('Transaction', TransactionSchema);
