var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var config = require('./config')

var mongoose = require('mongoose')
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.set('trust proxy', 1)
app.set('etag', false)
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1111')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

var models = require('./models')

app.use('/', models)

var port = process.env.PORT || 2222

app.listen(port)

console.log('API up on port ' + port)
