var express = require('express')
var router = express.Router()

var post = require('./post')
var user = require('./user')
var admin = require('./admin')
var settings = require('./settings')
var messages = require('./messages')

router.use('/post', post)
router.use('/user', user)
router.use('/admin', admin)
router.use('/settings', settings)
router.use('/messages', messages)

module.exports = router