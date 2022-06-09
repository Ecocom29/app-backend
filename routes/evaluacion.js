/*
    Evaluacion Router
    /api/evaluacion
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerEvaluaciones, crearEvaluacion, actualizarEvaluacion, eliminarEvaluacion } = require('../controllers/evaluacionController');

const router = Router();

//Validar JWT
router.use(validarJWT);

//Pasar por validacion del token
//Obtener eventos
router.get('/', obtenerEvaluaciones);

//Crear eventos
router.post('/',
    [
        check('correoElectronico', 'El correo electronico es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearEvaluacion
);

//Actualizar eventos
router.put('/:id', actualizarEvaluacion);

//Eliminar eventos
router.delete('/:id', eliminarEvaluacion);

module.exports = router;