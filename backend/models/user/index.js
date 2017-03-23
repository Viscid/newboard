var express = require('express')
var router = express.Router()

var someUsers = [
    {name: 'Viscid', password: 'woobie'},
    {name: 'Needles', password: 'scoobie'},
    {name: 'Deevee', password: 'sh00bie'},
]

router.get('/', function (req, res) {
    res.json(someUsers)
})

module.exports = router