var express = require('express')

var router = express.Router()

var formattedMessage = require('../../../helpers/formattedMessage.js')
var tags = require('../../../config/tags.js')

var Message = require('./Post')

var checkAccess = require('../helpers/checkAccess')
var checkFields = require('../helpers/checkFields.js')

var Promise = require('bluebird')

router.post('/', checkAccess('user'), function(req, res) {
  if (!checkFields(req, ['recipient', 'message'])) return res.sendStatus(500)
  return res.sendStatus(200)
})