var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 

var AnswerSchema = new Schema ();

AnswerSchema.add({
  source: {type: String, unique: true},
  answer: {type: String, default: ''},
  chapter: {type: String},
  idx: {type: String},
  correct: {type: Boolean, default: false}
});


var QuestionSchema = new Schema();

QuestionSchema.add({
  source: {type: String, unique: true},
  question: {type: String, default: ''},
  explanation: {type: String, default: ''},
  answer: [AnswerSchema],
  isBonusQuestion:{type: Boolean, default:false}
});

var QuizSchema = new Schema();
QuizSchema.add(
{
  title: {type: String, default: ''},
  isDefaultFinalExam:{type:Boolean, default:false},
  section: {type: String, default: ''},
  chapter: {type: String, default:'', unique: true},
  restart_section: {type: String, default: ''},
  questions: [QuestionSchema],
});

QuizSchema.path('title').validate(function (title) {
  return title.length;
}, 'invalid_title');
QuizSchema.path('section').validate(function (section) {
  return section.length;
}, 'invalid_section');
QuizSchema.path('chapter').validate(function (chapter) {
  return chapter.length;
}, 'invalid_chapter');

mongoose.model('Question', QuestionSchema);
mongoose.model('Answer', AnswerSchema);
mongoose.model('Quiz', QuizSchema);