var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var postSchema = mongoose.Schema({
  username: String,
  datetime: Date,
  message: String
})

var Post = mongoose.model('Post', postSchema)

router.post('/', function(req, res) {
  console.log('hello')
  if (req.session.hasOwnProperty('user')) {
    var newPost = new Post({
      username: req.session.user.username,
      datetime: new Date(),
      message: req.body.message
    })
    newPost.save(function (err) {
      if (err) res.sendStatus(500)
      res.sendStatus(200)
    })
  } else {
    res.sendStatus(500)
  } 
})

router.get('/', function(req, res) {
  Post.find({}).exec(function(err, results) {
    if (err) res.send(500)
    res.json(results)
  })
})

module.exports = router






/*

var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var config = require('../../config')

mongoose.connect(config.database)

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

*/