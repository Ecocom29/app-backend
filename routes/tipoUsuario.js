
/*
    Tipo Usuario Router
    /api/tipoUsuario
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { ObtenerTipoUsuario, crearTipoUsuario, actualizarTipoUsuario, eliminarTipoUsuario } = require('../controllers/tipoUsuarioController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener los tipo usuario */
router.get('/', ObtenerTipoUsuario);

/* Ruta para crear nuevo tipo usuario */
router.post('/',
    [
        check('nombreTipo', 'El tipo de usuario es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    crearTipoUsuario
);

/* Ruta para actualizar el tipo usuario */
router.put('/:id', actualizarTipoUsuario);

/* Ruta para eliminar el tipo usuario*/
router.delete('/:id', eliminarTipoUsuario);

module.exports = router;