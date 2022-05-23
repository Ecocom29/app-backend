/*
    Estado Router
    /api/estado
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerEstados, actualizarEstado, eliminaEstado, crearEstado } = require('../controllers/estadoController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener los estados */
router.get('/', obtenerEstados);

/* Ruta para crear nuevo estado */
router.post('/',
    [
        check('nombreEstado', 'El nombre del estado es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    crearEstado
);

/* Ruta para actualizar el estado */
router.put('/:id', actualizarEstado);

/* Ruta para eliminar el estado */
router.delete('/:id', eliminaEstado);

module.exports = router;