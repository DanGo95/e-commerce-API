const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '7d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error generando el token');
            } else {
                resolve(token);
            }
        });

    });

};


module.exports = {
    generateJWT
};