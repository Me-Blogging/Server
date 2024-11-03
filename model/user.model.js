const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true 
    },
    profilePicture: {
      type: String,
      default: 'default.png'
    },
    bio: {
      type: String
    },
    role: {
      type: String,
      enum: ['user','admin','superAdmin'],
      default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);