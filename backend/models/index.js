var express = require('express')
var router = express.Router()

var post = require('./post')
var user = require('./user')
router.use('/post', post)
router.use('/user', user)

module.exports = router