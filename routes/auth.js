/*
    Rutas de usuario / auth
    Host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { createUser, loginUser, revalidToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

router.post(
    '/CreateUser',
    [
        check('nombres', 'El nombre obligatorio').not().isEmpty(),
       // check('correoElectronico', 'El email es obligatorio').not().isEmail(),
        check('contrasenia', 'El password debe ser mas de 5 caracteres').not().isEmpty(),
        validarCampos
    ]
    , createUser
);

router.post(
    '/Login',
    [
        check('correoElectronico', 'El email es obligatorio').not().isEmpty(),
        check('contrasenia', 'El password debe ser mas de 5 caracteres').not().isEmpty(),
        validarCampos
    ],
    loginUser
);

router.get(
    '/renew',
    validarJWT, 
    revalidToken
    );


module.exports = router;
