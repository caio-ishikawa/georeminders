const router = require('express').Router();
const Reminders = require('../models/Reminders');

router.post('/get_pins', async (req, res) => {
    const pins = await Reminders.find({ username: req.body.username});
    res.json({pins});
});

module.exports = router;