var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')
var morgan = require('morgan')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var config = require('../config/')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.set('trust proxy', 1)
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, name: 'poop.gobble.delight', maxAge: 60480000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.corsOrigin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(function(req, res, next) {
  req.io = io
  next()
})

var models = require('./models')
app.use('/api/', models)

app.use(express.static('dist'))

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

var socketHandler = require ('./sockets')(io)

io.on('connect', socketHandler)

var port = process.env.PORT || config.backendPort

server.listen(port)

console.log('API up on port ' + port)
