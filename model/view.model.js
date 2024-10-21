const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    // ... other fields
}, { timestamps: true });

const YourModel = mongoose.model('YourModel', yourSchema);