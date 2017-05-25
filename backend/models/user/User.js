var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  registrationDate: { type: Date, default: Date.now() },
  settings: { type: Object, default: {} },
  lastLogin: { type: Date },
  role: { 
    type: String,
    enum: ['admin', 'mod', 'user', 'unvalidated', 'banned'],
    default: 'user'
  },
  email: String,
  hash: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)