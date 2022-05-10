const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {
    
    return new Promise((resolve, reject) => {

        const paylod = { uid, name };

        jwt.sign(
            paylod, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        }
        );
    });
}

module.exports = {
    generarJWT
}