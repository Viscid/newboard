var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

var User = mongoose.model('User', userSchema)

var someUsers = [
    {name: 'Viscid', password: 'woobie'},
    {name: 'Needles', password: 'scoobie'},
    {name: 'Deevee', password: 'sh00bie'},
]

router.get('/', function (req, res) {
  res.json(someUsers)
})

router.post('/register', function(req, res) {
  console.log(req.body)
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