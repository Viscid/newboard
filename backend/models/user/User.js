var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  registrationDate: { type: Date, default: Date.now() },
  lastLogin: { type: Date },
  email: String,
  hash: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)