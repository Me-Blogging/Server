const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true 
  }
}, {timestamp: true})

const Post = mongoose.Model("Post", PostSchema)

module.exports = Post 