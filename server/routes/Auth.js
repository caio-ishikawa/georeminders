const router = require('express').Router();
const User = require('../models/User');
const { userExists } = require('../utils/userExists');

router.post('/register', async (req, res) => {
    if (userExists(req.body.username, req.body.email)) {
        res.status(400).send("Username or email already exists.");
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        res.send(newUser);
    } catch (err) {
        res.status(400).json({"message":"Could not create user. Try again later."})
        console.log(err);
    }
});

module.exports = router;