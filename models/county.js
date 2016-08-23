var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountySchema = new Schema ();

CountySchema.add({
  county_name:{type: String},
  count_code:{type: String},
  court_name: {type: String},
  court_city: {type: String},
});

mongoose.model('County', CountySchema);