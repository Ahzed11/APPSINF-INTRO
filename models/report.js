const mongoose = require('mongoose');
const User = require('./user');

const userSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type:Date,
        default:Date.now,
    },
});

userSchema.index({description: 'text', address: 'text'});

const Report = mongoose.model('Report', userSchema);

module.exports = Report;
