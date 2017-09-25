var jwt = require('jsonwebtoken')

var config = require('../../config')

var userSessions = {}

module.exports = function(io) {
  return function(socket) {

    updateOnlineUsers(io)

    socket.on('logout', function() {
      if ('username' in socket) {
        delete socket['username']
        delete userSessions[socket.id]
      }
      updateOnlineUsers(io)
    })

    socket.on('disconnect', function() {
      if ('username' in socket) delete socket['username']
      updateOnlineUsers(io)
    })

    socket.on('login', function(token) {
      jwt.verify(token, config.jwtKey, function(err, decoded) {
        if (err) { 
          console.log(err)
          return
        }
        socket.join(decoded.username)
        userSessions[socket.id] = decoded.username
        socket.username = decoded.username
        updateOnlineUsers(io)
      })
    })
  }
}

function userSockets (username) {
  var sockets = []
  for (var key in userSessions) {
    if (userSessions[key] === username) sockets.push(key)
  }
  return sockets
}

function updateOnlineUsers(io) {
  io.sockets.clients(function(err, clients) {
    if (err) { 
      console.log(err)
      return
    }

    var onlineUsers = []
    for (var socketId in userSessions) {
      if (clients.indexOf(socketId) < 0) delete userSessions[socketId]
      if (userSessions[socketId] && onlineUsers.indexOf(userSessions[socketId]) < 0) onlineUsers.push(userSessions[socketId])
    }

    io.emit('onlineUsers', {list: onlineUsers, total: onlineUsers.length + (clients.length - Object.keys(userSessions).length) })
  })
}

