var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var config = require('../../config.js')

var bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true }},
  email: String,
  hash: String,
  password: String
})

var User = mongoose.model('User', userSchema)

var errors = require('../helpers/errors.js')

router.post('/register', validateRegistrationFields, function(req, res) {
  var user = req.body.user

  User.count({email: user.email}, function(err, count) {
    if (err) res.status(500).send({ error: 'Error finding submitted e-mail of user.'})
    if (count > 0) res.status(400).send(errors.emailUsed)
    else {
      bcrypt.hash(user.password, config.bcryptSaltRounds, function(err, hash) {
        if(err) res.status(500).send({ error: 'Error hashing password.'})
        var newUser = new User({
          username: user.username,
          hash: hash,
          email: user.email
        })

        newUser.save(function (err, registeredUser) {
          if (err && err.code == 11000) res.status(500).send(errors.usernameTaken)
          res.json(registeredUser)
        })        
      })
    }
  })
})

function validateRegistrationFields(req, res, next) {
  if (req.body.hasOwnProperty('user')) {
    var user = req.body.user
  
    if (!user.username || !user.password || !user.email) {
      res.status(500).send(errors.missingRegistrationFields)
    } else if (user.username.length > 15) res.status(500).send(errors.usernameLength)
    else if (user.password.length > 200) res.status(500).send(errors.passwordLenth)
    else if (user.email.length > 100) res.status(500).send(errors.emailLength)
    else if (!/^[\w\-\s]+$/.test(user.username)) {
      res.status(500).send(errors.usernameInvalidCharacters)
    } else next()
  } else {
    res.status(500).send(errors.invalidRegistrationData)
  }
}

router.put('/login', function(req, res) {
  if (req.session.user && !req.body.user.hasOwnProperty('username')) {
    res.json(req.session.user)
    return
  }
  var user = req.body.user
  User.findOne({username: user.username}, function (err, foundUser) {
    if (err) res.status(500).send({error: 'Error finding user.'})
    else if (!foundUser) res.status(404).send(errors.loginCredentialsInvalid) 
    else {
      bcrypt.compare(user.password, foundUser.hash).then(function(succ) {
        if (succ === true) {
          req.session.user = foundUser
          foundUser = foundUser.toObject()
          delete foundUser['hash']
          console.log('sending', foundUser)
          res.json(foundUser)
        } else res.status(404).send(errors.loginCredentialsInvalid) 
      })
    }
  })
})

router.put('/logout', function (req, res) {
  if (req.session.user) delete req.session.user
  res.sendStatus(204)
})

module.exports = router