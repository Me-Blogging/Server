const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true 
  },
  htmlContent: {
    type: String
  },
  picture: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'deleted'],
    default: 'draft'
  },
  date: {
    type: Date
  }
}, {timestamp: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post 