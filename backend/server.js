var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var models = require('./models')

app.use('/', models)

var port = process.env.PORT || 2222

app.listen(port)

console.log('API up on port ' + port)
