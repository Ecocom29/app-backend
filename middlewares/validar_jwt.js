const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    
    const token = req.header('xtoken');

    if(!token ){
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la peticion.'
        })
    }

    try {
        
        const { uid, nombres} = jwt.verify(
            token,
            process.env.SECRET_JWT
        );

        req.uid = uid;
        req.nombres = nombres;
             
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}

