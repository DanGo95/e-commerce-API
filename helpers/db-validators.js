const User = require('../models/user');

const emailExists = async(email) => {
    const checkEmail = await User.findOne({email});

    if( checkEmail ) {
        throw new Error('El email ya se encuentra registrado');
    }
};

const usernameExists = async(username) => {
    const checkUsername = await User.findOne({username});

    if (checkUsername) {
        throw new Error('El nombre de usuario ya se encuentra en uso');
    }
};

module.exports = {
    emailExists,
    usernameExists
};