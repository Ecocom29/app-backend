/*
    Rutas de usuario / auth
    Host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { creaUsuario, loginUsuario, validaToken, actualizaUsuario, eliminaUsuario, ObtenerUsuarioUID } = require('../controllers/usuarioController');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

router.post(
    '/',
    [
        check('nombres', 'El nombre obligatorio').not().isEmpty(),
        check('correoElectronico', 'El email es obligatorio').not().isEmpty(),
        check('contrasenia', 'El password debe ser mas de 5 caracteres').not().isEmpty(),
        validarCampos
    ]
    , creaUsuario
);

/* Ruta para obtener usuario con UID */
router.get('/:id', ObtenerUsuarioUID);

router.post(
    '/Login',
    [
        check('correoElectronico', 'El email es obligatorio').not().isEmpty(),
        check('contrasenia', 'El password debe ser mas de 5 caracteres').not().isEmpty(),
        validarCampos
    ],
    loginUsuario
);

/* Ruta para actualizar el usuario */
router.put('/:id', actualizaUsuario);

/* Ruta para eliminar el usuario */
router.delete('/:id', eliminaUsuario);

router.get(
    '/renew',
    validarJWT, 
    validaToken
);

module.exports = router;
