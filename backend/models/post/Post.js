var mongoose = require('mongoose')

mongoose.plugin(require('mongoose-slug-generator'), { 
  truncate: 35
})

var postSchema = mongoose.Schema({
  username: String,
  datetime: { type: Date, default: Date.now },
  message: String,
  formattedMessage: Array,
  reactions: Array,
  votes: Array,
  parentId: mongoose.Schema.Types.ObjectId,
  replyCount: { type: Number },
  replyOrder: { type: Number },
  lastReply: { type: Date, default: Date.now },
  root: mongoose.Schema.Types.ObjectId,
  slug: { type: String, slug: ['username', 'message'], unique: true }
})

postSchema.index({message: 'text', username: 'text'})

module.exports = mongoose.model('Post', postSchema)