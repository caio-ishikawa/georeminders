const router = require('express').Router();
const Reminders = require('../models/Reminders');

router.post('/post_pin', async (req, res) => {
    let lat = req.body.lat;
    let lng = req.body.lng;
    let note = req.body. note;
    let username = req.body.username;

    console.log({ lat, lng, note, username})

    const newReminder = new Reminders({
        latitude: lat,
        longitude: lng,
        note: note,
        username: username
    });

    try {
        let savedReminder = await newReminder.save();
        res.json({"data": "New reminder was saved."});
    } catch(err) {
        res.json({"message":"Could not save reminder. Try again later."})
    }
});

module.exports = router;