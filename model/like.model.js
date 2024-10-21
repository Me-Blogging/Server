const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, { timestamps: true });

const YourModel = mongoose.model('YourModel', yourSchema);