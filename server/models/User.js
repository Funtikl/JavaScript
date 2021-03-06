const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const userSchema = new Schema ({
  admin: {type: Boolean},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, unique: true},
  cohort: {type: String, required: false},
  progress: {
    lessons: [{
      name: {type: String},
      status: {type: String},
      score: {type: Number},
    }],
    jsAssessment: {type: String} //This assessment represents the assessment score for a particular user
    }
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
