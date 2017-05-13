var express = require('express')
var router = express.Router()

var post = require('./post')
var user = require('./user')
var admin = require('./admin')

router.use('/post', post)
router.use('/user', user)
router.use('/admin', admin)

module.exports = router