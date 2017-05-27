var jwt = require('jsonwebtoken')

var config = require('../../config')

var onlineUsers = {}
var onlineUsersCount = 0

module.exports = function(io) {
  return function(socket) {

    updateOnlineUsers(io)

    socket.on('logout', function() {
      if ('username' in socket) {
        delete socket.username
        delete onlineUsers[socket.id]
      }
      updateOnlineUsers(io)
    })

    socket.on('disconnect', function() {
      if ('username' in socket) delete socket.username
      updateOnlineUsers(io)
    })

    socket.on('login', function(token) {
      jwt.verify(token, config.jwtKey, function(err, decoded) {
        if (err) { 
          console.log(err)
          return
        }
        onlineUsers[socket.id] = decoded.username
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

    onlineUsersCount = clients.length

    for (var socketId in onlineUsers) {
      if (clients.indexOf(socketId) === -1) {
        delete onlineUsers[socketId]
      }
    }

    var onlineUsersArray = []
    for (var key in onlineUsers) {
      if (onlineUsersArray.indexOf(String(onlineUsers[key])) === -1) onlineUsersArray.push(onlineUsers[key])
    }

    io.emit('onlineUsers', {list: onlineUsersArray, total: onlineUsersCount })
  })
}

