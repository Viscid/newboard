var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  email: String,
  hash: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)