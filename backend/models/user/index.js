var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

var User = mongoose.model('User', userSchema)

router.post('/register', validateRegistrationFields, function(req, res) {
  if (req.body.hasOwnProperty('user')) {
    console.log('Creating user: ' + req.body.user.username + ' with password ' + req.body.user.password)
    var newUser = new User({
      username: req.body.user.username,
      password: req.body.user.password
    })
    newUser.save(function (err, registeredUser) {
      if(err) res.send(500)
      res.json(registeredUser)
    })
  }
})

function validateRegistrationFields(req, res, next) {
  console.log('Validating registration data...', req.body)
  if (req.body.hasOwnProperty('user')) {
    var username = req.body.user.username
    var password = req.body.user.password
    var email = req.body.user.email
  

    if (!username || !password || !email) {
      res.status(500).send({error: 'Missing registration fields.'})
    } else if (username.length > 15) res.status(500).send({error: 'Username length is too long'})
    else if (password.length > 200) res.status(500).send({error: 'Password length is too long'})
    else if (password.length > 100) res.status(500).send({error: 'E-Mail length is too long'})
    else if (!/^[\w\-\s]+$/.test(username)) {
      console.log(!/^[\w\-\s]+$/.test(username))
      res.status(500).send({error: 'Username contains invalid characters'})
    } else next()
  } else {
    res.status(500).send({error: 'Invalid registration data'})
  }
}

router.put('/login', function(req, res) {
  if (req.session.user && !req.body.user.hasOwnProperty('username')) {
    res.json(req.session.user)
    return
  }
  var user = req.body.user
  User.findOne({username: user.username}, function (err, foundUser) {
    if (err) res.send(500)
    if (foundUser.password === user.password) {
      req.session.user = foundUser
      res.json(foundUser)
    } else {
      res.send(500)
    }
  })
})

module.exports = router