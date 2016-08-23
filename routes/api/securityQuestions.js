var mongoose = require('mongoose'),
  User = mongoose.model('User');

var q = [
  {
    id: '0',
    question: 'What color are your eyes?',
    answers: ['brown','blue', 'green','hazel']
  },
  {
    id: '1',
    question: 'What is your favorite shape?',
    answers: ['circle', 'square', 'rectangle', 'triangle']
  },
  {
    id: '2',
    question: 'What is your favorite body of water?',
    answers: ['river', 'ocean', 'bathtub', 'lake']
  },
  {
    id: '3',
    question: 'What animal would you prefer to be?',
    answers: ['snake', 'tiger', 'squirrel', 'wolf']
  },
  {
    id: '4',
    question: 'What kind of movies do you like most?',
    answers: ['horror', 'drama', 'independent', 'comedy']
  },
  {
    id: '5',
    question: 'How many children do you have?',
    answers: ['one', 'two', 'zero', 'none of the above']
  },
  {
    id: '6',
    question: 'Which activity interests you most?',
    answers: ['dancing', 'swimming', 'writing', 'singing']
  },
  {
    id: '7',
    question: 'What food would you rather eat?',
    answers: ['chocolate', 'pasta', 'watermelon', 'salad']
  },
  {
    id: '8',
    question: 'What is your natural hair color?',
    answers: ['red', 'blonde', 'black', 'brown']
  },
  {
    id: '9',
    question: 'Do you watch football?',
    answers: ['yes, always', 'no, never', 'sometimes']
  },
];


exports.list = function (req, res) {
  return res.send(200, {questions: q });
};

exports.test = function (req, res) {
  var x = Math.floor((Math.random() * 10));
  return res.send(200, {question: q[x] });
};

exports.check = function (req, res) {
  var params = req.body,
  user = req.session.data;
  if (!user)
    return res.send(200, {error: 'invalid_user' });
  else {
    if (user.security_questions) {

      var s = user.security_questions;
      if (s[params.id].answer.toUpperCase() === params.answer.toUpperCase()) {

        s[params.id].count = s[params.id].count + 1;
        User.findOneAndUpdate({
            _id: user._id
        }, s, function(err, doc){
          if (err)
            return res.send(200, {error: err});

          else
            return res.send(200, {data: 'correct'});
        });
      } else {
        return res.send(200, {data: 'wrong_answer' });
      }

    } else {
      return res.send(200, {error: 'missing_security_questions' });
    }
  }
};
