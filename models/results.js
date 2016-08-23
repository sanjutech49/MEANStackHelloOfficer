var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WronganswerSchema = new Schema ();

WronganswerSchema.add({
  source: {type: String},
  answer: {type: String, default: ''},
  chapter: {type: String},
  idx: {type: String},
  correct: {type: Boolean, default: false},
   question: {type: String, default: ''}
});

var CorrectanswerSchema = new Schema ();

CorrectanswerSchema.add({
  source: {type: String},
  answer: {type: String, default: ''},
  chapter: {type: String},
  idx: {type: String},
  correct: {type: Boolean, default: false},
   question: {type: String, default: ''}
});

var GivenAnsSchema = new Schema ();

GivenAnsSchema.add({
  source: {type: String},
  answer: {type: String, default: ''},
  chapter: {type: String},
  idx: {type: String},
  correct: {type: Boolean, default: false},
   question: {type: String, default: ''}
});


var ResultSchema = new Schema({
  user_id: {type: String},
  chapter: {type: String, default:''},
  score: [Boolean],
  answers: [String],
  status: {type: String, default: 'start'},
  verify: {type: String},
  wrongAnswers:[WronganswerSchema],
  correctAnswers:[CorrectanswerSchema],
  givenAns:[GivenAnsSchema]
});

mongoose.model('Result', ResultSchema);
