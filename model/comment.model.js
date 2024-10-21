const mongoose = require('mongoose');

const CommentModel = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentModel);

module.exports = Comment