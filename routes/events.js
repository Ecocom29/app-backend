/*
    Events Router
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Validar JWT
router.use(validarJWT);

//Pasar por validacion del token
//Obtener eventos
router.get('/', getEvents);

//Crear eventos
router.post('/',
    [
        check('titulo', 'El titulo obligatorio').not().isEmpty(),
        check('notas', 'Las notas son obligatorias').not().isEmpty(),
        check('fechaInicio', 'La fecha inicio es obligatorio').custom(isDate),
        check('fechaFin', 'La fecha final es obligatorio').custom(isDate),
        validarCampos
    ],
    createEvent
);

//Actualizar eventos
router.put('/:id', updateEvent);

//Eliminar eventos
router.delete('/:id', deleteEvent);

module.exports = router;
