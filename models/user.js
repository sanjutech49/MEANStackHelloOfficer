var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var securitySchema = new Schema ({
  question: {type: String, default: ''},
  answer: {type: String, default: ''},
  count: {type: String, default: '0'}
});

var UserSchema = new Schema({
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  email: { type: String, default: '' },
  telephone: { type: String, default: '' },
  birthdate: {type: Date},
  street: { type: String, default: ''},
  city: { type: String, default: ''},
  state: { type: String, default: ''},
  zipcode: { type: String, default: ''},
  dl_number: { type: String, default: ''},
  dl_type:{type:String, default:''},
  dl_state: { type: String, default: ''},
  ticket_number: { type: String, default: ''},
  ticket_due_date: { type: Date},
  ticket_county: { type: String, default: ''},
  ticket_court: { type: String, default: ''},
  bookmark: { type: String, default: ''},
  search_refer: { type: String, default: ''},
  hashed_password: { type: String, default: '' },
  admin: {type: Boolean, default: false},
  status: {type: String, default:'signup'},
  salt: { type: String, default: '' },
  security_questions: [securitySchema],
  current_quizes: [{type:Schema.Types.ObjectId, ref:'Result'}],
  class_status: {type: String, default: 'start'},
  check_id: {type: Boolean, default: false},
  final_exam: {type: String, default:'unpaid'},
  finalExamCompletionDate:{type: Date,default: ''},
  resetPasswordToken:{type: String,default: ''},
  resetPasswordExpires:{type: Date,default: ''},
  certificateNumber:{type:String,default:''},
  course_eval:{type:Boolean, default:false},
  email_verified:{type:Boolean,default:false},
  emailVerificationString:{type:String,default:''},
  finalExamCount:{ type: Number,default:1},
  givenFinalExam:{type:Boolean,default:false}
});


securitySchema.path('answer').validate(function(answer) {
  return answer.length;
}, 'invalid_answer');

securitySchema.path('question').validate(function(question) {
  return question.length;
}, 'invalid_question');

var oAuthTypes = [];
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });
/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.path('first_name').validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'invalid_first_name');

UserSchema.path('last_name').validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'invalid_last_name');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation())
    fn(true);

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {

      if(users.length) return fn(false);
      fn(true);

      if(err!=null) throw err;
      
    });
  } else {
    fn(true);
  }
}, 'email_taken');


UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length;
}, 'invalid_password');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password,salt_) {
    if (!password.length) return '';
    try {

      return crypto
        .createHmac('sha1', salt_?salt_:this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'email';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('User', UserSchema);
