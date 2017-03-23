var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

var models = require('./models')

app.use('/', models)

var port = process.env.PORT || 2222

app.listen(port)

console.log('API up on port ' + port)
