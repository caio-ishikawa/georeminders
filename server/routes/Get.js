const router = require('express').Router();
const Reminders = require('../models/Reminders');
const User = require('../models/User');

router.post('/get_pins', async (req, res) => {
    const pins = await Reminders.find({ username: req.body.username});
    const user = await User.findOne({ username: req.body.username });
    res.json({"pins": pins,"tier": user.tier});
});

module.exports = router;