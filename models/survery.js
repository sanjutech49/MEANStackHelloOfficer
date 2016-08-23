var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var QuestionSchema = new Schema();
QuestionSchema.add({
  idx: {type: String, default: ''},
  question: {type: String, default: ''},
  answer: {type: String, default: ''}
});


var SurveySchema = new Schema ();
SurveySchema.add({
  user_id: {type: String},
  first_name: { type: String, default: '' },
  middle_name:{type: String, default:''},
  last_name: { type: String, default: '' },
  school_name: { type: String, default: '' },
  school_license: { type: String, default: '' },
  course_completion_date: { type: String, default: '' },
  date: {type: Date, default: Date.now},
  questions: [QuestionSchema]
});



mongoose.model('Survey', SurveySchema);
