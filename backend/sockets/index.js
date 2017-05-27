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
        userSessions[socket.id] = decoded.username
        socket.username = decoded.username
        updateOnlineUsers(io)
      })
    })
  }
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
      if (onlineUsers.indexOf(userSessions[socketId]) < 0) onlineUsers.push(userSessions[socketId])
    }

    io.emit('onlineUsers', {list: onlineUsers, total: clients.length })
  })
}

