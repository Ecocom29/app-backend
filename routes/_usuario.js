/*
    Usuario Router
    /api/usuario
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerUsuarios, creaUsuario, actualizaUsuario, eliminaUsuario } = require('../controllers/_usuarioController');

const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener usuarios */
router.get('/', obtenerUsuarios);

/* Ruta para crear nuevo usuario */
router.post('/',
    [
        check('nombres', 'El nombre es obligatorio.').not().isEmpty(),
        check('correoElectronico', 'El correo electrónico es obligatorio.').not().isEmpty(),
        check('contrasenia', 'La contrasenia es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    creaUsuario
);

/* Ruta para actualizar el usuario */
router.put('/:id', actualizaUsuario);

/* Ruta para eliminar el usuario */
router.delete('/:id', eliminaUsuario);

module.exports = router;