var express = require('express')
var router = express.Router()

var User = require('../user/User')
var Post = require('../post/Post')

var checkAccess = require('../helpers/checkAccess')

router.get('/users', checkAccess('admin'), function(req, res) {
  User.find({})
  .exec()
  .then(function(users) {
    res.json(users)
  })
  .catch(function(err) {
    res.status(500).send(err)
  })
})

router.put('/user/:username', checkAccess('admin'), function(req, res) {
  var username = req.params.username
  var role = req.body.role

  User.findOneAndUpdate({username: username}, {$set: { role: role}})
  .then(function() {
    User.find({})
    .exec()
    .then(function(users) {
      res.json(users)
    })
    .catch(function(err) {
      res.send(err)
    })
  })
  .catch(function(err) {
    res.send(err)
  })
})

router.get('/post/:post/nuke', checkAccess('mod'), function(req, res) {
  var postId = req.params.post
  Post.findOneAndUpdate({_id: postId}, { $set: { message: 'This post has been nuked.' }, $unset: { formattedMessage: '' } })
  .exec()
  .then(res.send())
  .catch(function(err) {
    res.status(500).send(err)
  })
})

router.get('/post/:post/delete', checkAccess('mod'), function(req, res) {
  var postId = req.params.post
  Post.findOneAndRemove({_id: postId})
  .exec()
  .then(res.send())
  .catch(function(err) {
    res.status(500).send(err)
  })
})

module.exports = router