var express = require('express')

var router = express.Router()

var formattedMessage = require('../../../helpers/formattedMessage.js')
var tags = require('../../../config/tags.js')
var reactions = require('../../../config/reactions.js')

var Post = require('./Post')

var checkAccess = require('../helpers/checkAccess')

var Promise = require('bluebird')

router.post('/', checkAccess('user'), function(req, res) {
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

              reply.save(function (err, reply) {
                if ('socket' in req) req.io.emit('post', reply)
                err ? res.sendStatus(500) : res.sendStatus(200)
              })
            })
          }
        })
      } else {

        var newThread = new Post(newPost)

        newThread.save(function (err, post) {
          if ('socket' in req) req.io.emit('post', post)
          err ? res.sendStatus(500) : res.sendStatus(200)
        })
      }
    } else res.sendStatus(500)  // Body does not contain 'post' object.
  } else res.sendStatus(500) // User is not logged in.
})

router.get('/:slug', function(req, res) { // Returns a post as found by its slug. 
  var slug = req.params.slug

  Post.findOne({ slug: slug }, function(err, queriedPost) {
    var activePost = queriedPost

    if (queriedPost.get('root')) {
      Post.findOne({ _id: queriedPost.root }, function(err, queriedThread) {
        var thread = queriedThread ? queriedThread.toObject() : undefined
        if (thread) sendThread(thread, activePost)
        else res.status(500).send({error: 'Root no longer exists'})
      })
    } else {
      var thread = queriedPost.toObject()
      sendThread(thread, activePost)    
    }

    function sendThread(thread, activePost) {
      Post.find({ root: thread._id})
      .exec(function(err, queriedReplies) {
        var threadWithReplies = attachRepliesToThreads([thread], queriedReplies)
        res.json({ thread: threadWithReplies[0], activePost: activePost })
      })       
    }
  })
})

router.post('/find/', checkAccess('user'), function(req, res) { // Searches for a text-indexed posts
  var query = req.body.query
  Post.find({$text: {$search: query}})
  .select('-formattedMessage')
  .exec(function(err, results) {
    if(err) res.status(500).json(err)
    res.json(results)
  })
})

router.post('/reaction', checkAccess('user'), function(req, res) {
  var reaction = reactions.find(function(r) { return (r.name === req.body.name) })
  var postId = ('_id' in req.body.post ? req.body.post._id : undefined)
  if (!reaction || !postId) res.sendStatus(500)
  else {
    var reactionValue = { name: reaction.name, username: req.session.user.username }

    getPost(postId)
    .then(function(post) { return addReaction(post, reactionValue) })
    .then(function (post) {
      req.io.emit('reaction', { postId: post._id, reaction: reactionValue })
      res.json(post) })
    .catch(function(err) {
      if (err === 'ALREADY_REACTED') res.sendStatus(204)
      else res.status(500).send(err) 
    })
  }
})

router.post ('/vote', checkAccess('user'), function(req, res) {
  if (('post' in req.body) && ('direction' in req.body)) {

    var postId = req.body.post._id,
      username = req.session.user.username,
      direction = req.body.direction

    getPost(postId)
    .then(function(post) { return addVote(post, username, direction) })
    .then(function(post) {
      req.io.emit('vote', { postId: post._id, username: username, direction: direction})
      res.json(post) })
    .catch(function(err) {
      if (err === 'ALREADY_VOTED') res.sendStatus(204)
      else res.status(500).send(err)
    })
  } else res.sendStatus(500)
})

function getPost (postId) {
  return new Promise(function(resolve, reject) {
    Post.findOne({_id: postId}, function(err, post) {
      if (err) reject(err)
      else resolve(post)
    })
  })
}

function addVote(post, username, direction) {
  var vote = { direction: direction, username: username }
  console.log(vote)
  return new Promise(function(resolve, reject) {
    if (!hasActed('votes', post, username)) {
      Post.findOneAndUpdate({_id: post._id},
      { $push: { votes: vote } },
      { upsert: true, new: true },
      function (err, post) {
        if (err) reject(err)
        else resolve(post)
      })
    } else {
      reject ('ALREADY_VOTED')
    }
  })
}

function addReaction(post, value) {
  return new Promise(function(resolve, reject) {
    if (!hasActed('reactions', post, value.username)) {
      Post.findOneAndUpdate({_id: post._id},
      { $push: { reactions: value } },
      { upsert: true, new: true },
      function (err, post) {
        if (err) reject(err)
        else resolve(post)
      })
    } else {
      reject ('ALREADY_REACTED')
    }
  })
}

function hasActed(action, post, username) {
  var actions = post[action]
  if (actions) {
    var pastAction = actions.find(function(action) {
      return (action.username === username)
    })
    if (pastAction) return true
  }
  return false
}

router.get('/', function(req, res) {
  var page = Number(req.query.page || 1)
  var threadsPerPage = Number(req.query.threadsPerPage || 15)

  Post.find({ root: { $exists: false } }, '')
    // .select('-message')
    .sort( { lastReply: -1 } )
    .limit ( threadsPerPage )
    .skip( (page - 1) * threadsPerPage )
    .lean()
    .exec(function(err, threadResults) {
      if (err) res.send(500) // Some sort of DB error
      else {
        var threadIdList = []
        threadResults.forEach(function(thread) {
          threadIdList.push(thread._id)
        })
        Post.find( {'root': { $in: threadIdList }}, function(err, replyResults) {
          if (err) res.send(500) // Some sort of DB error with replies
          else {
            var threads = attachRepliesToThreads(threadResults, replyResults)
            res.json(threads)
          }
        })
      }
    })
})

function attachRepliesToThreads(threads, replies) {
  threads.forEach(function(thread, index) {
    threads[index].replies = {}
    var filteredReplies = replies.filter(function(reply) {
      return (threads[index]._id.toString() === reply.root.toString())
    })
    
    filteredReplies.forEach(function(reply) {
      var parent = reply['parentId'].toString()

      if (threads[index].replies.hasOwnProperty(parent)) threads[index].replies[parent].push(reply)
      else threads[index].replies[parent] = [reply]
    })
  })
  return threads
}

module.exports = router