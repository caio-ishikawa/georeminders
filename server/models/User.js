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
    }
});

module.exports = mongoose.model('User', UserSchema);