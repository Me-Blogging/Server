const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true  
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true 
    },
    profilePicture: {
      type: String 
    },
    bio: {
      type: String
    }
}, { timestamps: true });

const YourModel = mongoose.model('YourModel', yourSchema);