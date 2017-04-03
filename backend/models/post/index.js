var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

mongoose.plugin(require('mongoose-slug-generator'), { 
  truncate: 35
})

var postSchema = mongoose.Schema({
  username: String,
  datetime: { type: Date, default: Date.now },
  message: String,
  parentId: mongoose.Schema.Types.ObjectId,
  replyCount: { type: Number },
  replyOrder: { type: Number },
  root: mongoose.Schema.Types.ObjectId,
  slug: { type: String, slug: ['username', 'message'], unique: true }
})

var Post = mongoose.model('Post', postSchema)

router.post('/', function(req, res) {
  console.log(req.body)
  if ('user' in req.session && 'username' in req.session.user) { // Check if user is logged in.

    if ('post' in req.body) {
      
      var sentPost = req.body.post

      var newPost = {
        username: req.session.user.username,
        message: req.body.post.message
      }

      console.log(newPost)

      if ('parentId' in sentPost) { // Post is a reply to another post.
        Post.findById(sentPost.parentId, function(err, parentPost) { // Fetch the parent post
          if (err) {
            res.sendStatus(500)
          } else {
            newPost.root = (parentPost.root) ? parentPost.root : parentPost._id
            newPost.parentId = parentPost._id

            Post.findOneAndUpdate({_id: newPost.root}, { $inc: {replyCount: 1}}).exec(function (err, rootThread) {
              newPost.replyOrder = rootThread.replyCount ? rootThread.replyCount + 1 : 1
              console.log(newPost)
              var reply = new Post(newPost)

              reply.save(function (err) {
                err ? res.sendStatus(500) : res.sendStatus(200)
              })
            })
          }
        })
      } else {

        var newThread = new Post(newPost)

        newThread.save(function (err) {
          err ? res.sendStatus(500) : res.sendStatus(200)
        })
      }
    } else res.sendStatus(500)  // Body does not contain 'post' object.
  } else res.sendStatus(500) // User is not logged in.
})

router.get('/', function(req, res) {
  Post.find({ root: { $exists: false } })
    .sort( { datetime: -1 } )
    .exec(function(err, threadResults) {
      if (err) { 
        res.send(500) // Some sort of DB error
      } else {
        var threadIdList = []
        threadResults.forEach(function(thread) {
          threadIdList.push(thread._id)
        })
        Post.find( {'root': { $in: threadIdList }}, function(err, replyResults) {
          if (err) {
            res.send(500) // Some sort of DB error with replies
          } else {
            var replyDict = {}
            replyResults.forEach(function(replyResult) {
              var replyParentId = replyResult.parentId
              if (replyDict.hasOwnProperty(replyParentId)) {
                replyDict[replyParentId].push(replyResult)
              } else { replyDict[replyParentId] = [replyResult] }
            })
            res.json({threads: threadResults, replies: replyDict})
          }
        })
      }
    })
})

router.get('/:slug', function(req, res) {
  console.log('Finding: ', req.params.slug)
  Post.findOne({'slug': req.params.slug}, function(err, post) {
    if (err) res.send(500)
    res.json(post)
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