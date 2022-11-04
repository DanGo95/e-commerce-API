const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No tiene permiso para realizar esta acción'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }

        req.user = user;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token inválido'
        });
    }

};


module.exports = {
    validateJWT
};