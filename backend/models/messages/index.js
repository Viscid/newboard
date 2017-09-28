var express = require('express')

var router = express.Router()

var formattedMessage = require('../../../helpers/formattedMessage.js')
var tags = require('../../../config/tags.js')

var Message = require('./Message')

var checkAccess = require('../helpers/checkAccess')
var checkFields = require('../helpers/checkFields.js')

var Promise = require('bluebird')

router.post('/', checkAccess('user'), function(req, res) {
  if (!checkFields(req, ['recipient', 'body'])) return res.sendStatus(500)

  var message = { author: req.session.user.username, recipient: req.body.recipient, body: req.body.body, date_sent: new Date() }

  var messageHistory = new Message(message)

  messageHistory.save(function(err, savedMessage) {
    if (err) res.status(500).send({ error: err})
    else {
      req.io.to(savedMessage.author).emit('privateMessage', savedMessage)
      req.io.to(savedMessage.recipient).emit('privateMessage', savedMessage)
      res.sendStatus(200)
    }
  })
})

router.get('/', checkAccess('user'), function(req, res) {
  var username = req.session.user.username

  var conversationMessages = []

  var groupA = { _id: '$author',
    'id': { '$last': '$_id'},
    'author': { '$last': '$author'},
    'recipient': { '$last': '$recipient'},
    'seen': { '$last': '$seen'},
    'date_seen': { '$last': '$date_seen'},
    'body': { '$last': '$body'},
    'message': { '$last': '$body' },
    'date_sent': { '$last': '$date_sent' }}

  var groupB = { _id: '$recipient',
    'id': { '$last': '$_id'},
    'author': { '$last': '$author'},
    'recipient': { '$last': '$recipient'},
    'seen': { '$last': '$seen'},
    'date_seen': { '$last': '$date_seen'},
    'body': { '$last': '$body'},
    'message': { '$last': '$body' },
    'date_sent': { '$last': '$date_sent' }}

  Message.aggregate([
    { $match: { recipient: username } },
    { $sort: { date: -1 }},
    { $group: groupA }
  ], function (err, results) {
    if (err) res.status(500).send(err)
    results.forEach(function(result) {
      delete result._id
      result._id = result.id
      delete result.id
      conversationMessages.push(result)
    })
    Message.aggregate([
      { $match: { author: username } },
      { $sort: { date: -1 }},
      { $group: groupB }
    ], function(err, results) {
      if (err) res.status(500).send(err)
      results.forEach(function(result) {
        delete result._id
        result._id = result.id
        delete result.id
        conversationMessages.push(result)
      })
      res.send(conversationMessages)
    })

  })
})

router.get('/:user', checkAccess('user'), function(req, res) {
  var author = req.session.user.username
  var user = req.params.user

  Message.find( { $or:[ {$and:[{'author':author }, {'recipient':user}]}, {$and:[{ 'author':user }, { 'recipient':author }] }]},
    null,
    {sort: {date: -1}},
    function(err, messages) {
      res.send(messages)
    })

  Message.update({ author: user, recipient: req.session.user.username }, { $set: { seen: true }})

})

module.exports = router