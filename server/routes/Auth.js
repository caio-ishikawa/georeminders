const router = require('express').Router();
const User = require('../models/User');
const { userExists } = require('../utils/userExists');
const { usernameExists } = require('../utils/usernameExists');

router.post('/register', async (req, res) => {
    if (await userExists(req.body.username, req.body.email)) {
        res.status(400).json({"data": "Username or email already exists."});
    } else { 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        try {
            const savedUser = await newUser.save();
            res.json({"data": "User successfully created!"});
        } catch (err) {
            res.status(400).json({"message":"Could not create user. Try again later."})
            console.log(err);
        }
    }
});

router.post('/login', async (req, res) => {
    if (!await usernameExists(req.body.username)) {
        res.status(400).json({"message": "Invalid username/password"});
        console.log('uh oh')
    } else {
        const user = await User.findOne({username: req.body.username});
        if (user.password === req.body.password) {
            console.log("verified")
            res.json({"data": "Successful login!"});
        } else {
            console.log('damn')
            res.status(400).json({"message": "Invalid username/password."});
        }
    }

});

module.exports = router;