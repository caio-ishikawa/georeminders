const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true 
    },
    latitude: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Reminders', ReminderSchema);