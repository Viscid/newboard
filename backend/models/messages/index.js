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

  var message = { author: req.session.user.username, recipient: req.body.recipient, body: req.body.body, date_sent: new Date(), seen: true }

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
  Message
    .find( { $or: [ { 'author':username }, { 'recipient':username } ] } )
    .sort( { date: - 1} )
    .exec(function(err, response) {
      if (err) console.log(err)

      var sortedMessages = {}

      response.forEach(function(message) {
        (username === message.author) ? sortedMessages[message.recipient] = message : sortedMessages[message.author] = message
      })

      console.log(sortedMessages)
    
      res.send(response)
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

})

module.exports = router