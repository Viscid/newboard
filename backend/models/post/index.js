var express = require('express')
var router = express.Router()

var somePosts = [
    {id: 1, user: 'Viscid', message: 'Hello!'},
    {id: 2, user: 'Needles', message: 'Hallo!'},
    {id: 3, user: 'Viscid', message: 'Salut!'},
    {id: 4, user: 'Deevee', message: 'Ahoj!'},
    {id: 5, user: 'Needles', message: 'Hej!'},
    {id: 6, user: 'Needles', message: 'Shalom!'},
    {id: 7, user: 'Viscid', message: 'Sawadee!'},
    {id: 8, user: 'Deevee', message: 'Konichiwa!'},
]

router.use('/', function(req, res) {
    res.json(somePosts)
})

module.exports = router