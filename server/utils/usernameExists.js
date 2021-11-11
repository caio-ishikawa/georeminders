const User = require('../models/User');

const usernameExists = async (username) => {
    const user_name= await User.findOne({ username: username });

    if (user_name) {
        return true
    } else {
        return false
    }

};

exports.usernameExists = usernameExists;