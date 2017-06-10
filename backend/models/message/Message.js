var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, index: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, index: true },
  date_sent: { type: Date, default: Date.now },
  seen: Boolean,
  date_seen: { type: Date, default: Date.now },
  message: String,
  formattedMessage: Array
})

messageSchema.index({message: 'text', username: 'text'})

module.exports = mongoose.model('Post', postSchema)