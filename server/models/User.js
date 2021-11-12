const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    tier: {
        type: Number,
        enum: [ 0, 1, 2, 3],
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);