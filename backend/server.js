var express = require('express')

var app = express()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

var models = require('./models')

app.use('/', models)

var port = process.env.PORT || 2222

app.listen(port)

console.log('API up on port ' + port)