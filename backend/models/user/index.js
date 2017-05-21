var express = require('express')
var router = express.Router()

var config = require('../../../config')

var bcrypt = require('bcrypt')

var User = require('./User')
var Post = require('../post/Post')

var errors = require('../helpers/errors.js')

var Promise = require('bluebird')

router.post('/register', validateRegistrationFields, function(req, res) {
  var user = req.body.user

  User.count({email: user.email}, function(err, count) {
    if (err) res.status(500).send({ error: 'Error finding submitted e-mail of user.'})
    if (count > 0) res.status(400).send(errors.emailUsed)
    else {
      bcrypt.hash(user.password, config.bcryptSaltRounds, function(err, hash) {
        if(err) res.status(500).send({ error: 'Error hashing password.'})
        var newUser = new User({
          username: user.username.trim(),
          hash: hash,
          email: user.email.trim()
        })

        newUser.save(function (err, registeredUser) {
          if (err && err.code == 11000) res.status(500).send(errors.usernameTaken)
          else {
            var returnedUser = registeredUser.toObject()
            req.session.user = registeredUser
            delete returnedUser['hash']
            res.json(returnedUser)
          }
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
  User.findOne({username: user.username.trim()}, function (err, foundUser) {
    if (err) res.status(500).send({error: 'Error finding user.'})
    else if (!foundUser) res.status(404).send(errors.loginCredentialsInvalid) 
    else {
      bcrypt.compare(user.password, foundUser.hash).then(function(succ) {
        if (succ === true) {
          foundUser = foundUser.toObject()
          req.session.user = foundUser
          delete foundUser['hash']
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

router.get('/profile/:username', function (req, res) {
  var username = req.params.username
  if (!username) res.status(500).send(errors.noProfileUsername)
  else {
    var profile = {}
    Promise.all([
      User.findOne({username: username})
      .exec()
      .then( function(user) {
        profile['registered'] = user.registrationDate
        profile['lastLogin'] = user.lastLogin
      }),
      Post.find({username: username})
      .limit(10)
      .sort( { datetime: -1 } )
      .exec()
      .then( function(posts) {
        profile['lastPosts'] = posts
      })
    ])
    .then(function () {
      res.json(profile)
    })
    .catch(function() {
      res.status(500).send(errors.errorFetchingProfile)
    })
  }
})

module.exports = router