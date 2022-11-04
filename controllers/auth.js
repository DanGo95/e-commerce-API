const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Email/Password incorrecto'
            });
        }

        /* validate password */
        const passwordValid = bcryptjs.compareSync(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Email/Password incorrecto'
            });
        }

        /* generate el jwt */
        const token = await generateJWT(user.id);

        res.json({
            token
        });



    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Algo salió mal'
        });
    }

};

const register = async(req, res = response) => {

    const { email, password, username } = req.body;
    const user = new User({ email, password, username });

    /* hash password */
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });

};


module.exports = {
    login,
    register
};