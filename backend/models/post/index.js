var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var formattedMessage = require('../../../helpers/formattedMessage.js')
var tags = require('../../../config/tags.js')

mongoose.plugin(require('mongoose-slug-generator'), { 
  truncate: 35
})

var postSchema = mongoose.Schema({
  username: String,
  datetime: { type: Date, default: Date.now },
  message: String,
  formattedMessage: Array,
  parentId: mongoose.Schema.Types.ObjectId,
  replyCount: { type: Number },
  replyOrder: { type: Number },
  lastReply: { type: Date, default: Date.now },
  root: mongoose.Schema.Types.ObjectId,
  slug: { type: String, slug: ['username', 'message'], unique: true }
})

var Post = mongoose.model('Post', postSchema)

router.post('/', function(req, res) {
  if ('user' in req.session && 'username' in req.session.user) { // Check if user is logged in.

    if ('post' in req.body) {
      
      var sentPost = req.body.post
    
      var message = new formattedMessage(tags, sentPost.message)

      var newPost = {
        username: req.session.user.username,
        message: message.unformattedMessage,
        formattedMessage: message.formattedMessage,
      }

      if ('parentId' in sentPost) { // Post is a reply to another post.
        Post.findById(sentPost.parentId, function(err, parentPost) { // Fetch the parent post
          if (err) {
            res.sendStatus(500)
          } else {
            newPost.root = (parentPost.root) ? parentPost.root : parentPost._id
            newPost.parentId = parentPost._id

            Post.findOneAndUpdate({_id: newPost.root}, { $inc: {replyCount: 1}, lastReply: new Date()}, { upsert: true }).exec(function (err, rootThread) {
              newPost.replyOrder = rootThread.replyCount ? rootThread.replyCount + 1 : 1

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

router.get('/:slug', function(req, res) {
  var slug = req.params.slug

  Post.findOne({ slug: slug }, function(err, queriedPost) {
    var activePost = queriedPost
    var thread = {}
    var replyDict = {}

    if (queriedPost.get('root')) {
      
      Post.findOne({ _id: queriedPost.root }, function(err, queriedThread) {
        thread = queriedThread.toObject()
        
        Post.find({ root: thread._id})
          .exec(function(err, queriedReplies) {

            replyDict = buildDictionaryFromReplyResults(queriedReplies)

            res.json({
              thread: thread,
              replies: replyDict,
              activePost: activePost
            })

          })
      })
    } else {
      thread = queriedPost
      
      Post.find({ root: thread._id})
        .exec(function(err, queriedReplies) {
          replyDict = buildDictionaryFromReplyResults(queriedReplies)

          res.json({
            thread: thread,
            replies: replyDict,
            activePost: activePost
          })
        })        
    }
  })
})

router.get('/', function(req, res) {

  var page = Number(req.query.page)
  var threadsPerPage = Number(req.query.threadsPerPage)
  Post.find({ root: { $exists: false } }, '')
    .select('-message')
    .sort( { lastReply: -1 } )
    .limit ( threadsPerPage )
    .skip( (page - 1) * threadsPerPage )
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
            var replyDict = buildDictionaryFromReplyResults(replyResults)
            res.json({threads: threadResults, replies: replyDict})
          }
        })
      }
    })
})

module.exports = router


function buildDictionaryFromReplyResults(results) {
  var dict = {}

  results.forEach(function(result) {
    var parentId = result.parentId
    if (dict.hasOwnProperty(parentId)) {
      dict[parentId].push(result)
    } else { dict[parentId] = [result] }
  })

  return dict
}
