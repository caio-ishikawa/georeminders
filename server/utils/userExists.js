const User = require('../models/User');

const userExists = async (username, email) => {
    const user_name= await User.findOne({ username: username });
    const user_email = await User.findOne({ email: email});

    if (user_name || user_email) {
        return true
    } else {
        return false
    }

};

exports.userExists = userExists;