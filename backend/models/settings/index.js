var express = require('express')
var router = express.Router()

var User = require('../user/User')

var checkAccess = require('../helpers/checkAccess')

router.post('/', checkAccess('user'), function(req, res) {
  var username = req.session.user.username
  var settings = req.body.settings
  User.findOneAndUpdate({username: username},
   { $set: { settings: settings }},
   { upsert: true, new: true },
   function(err, user) {
     if (err) res.status(500).send(err)
     else {
       res.json(user.settings)}
   })
})

module.exports = router