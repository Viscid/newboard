var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({
  author: { type: String, index: true },
  recipient: { type: String, index: true },
  date_sent: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  date_seen: { type: Date, default: null },
  body: String,
  formattedMessage: Array
})

messageSchema.index({body: 'text', username: 'text'})

module.exports = mongoose.model('Message', messageSchema)