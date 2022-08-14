/*
    Atraccion Router
    /api/atraccion
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerAtracciones, creaAtraccion, actualizaAtraccion, eliminaAtraccion, ObtenerAtraccionesPorCategoria } = require('../controllers/atraccionController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener las atracciones */
router.get('/', obtenerAtracciones);

/* Ruta para obtener las atracciones por id de la cateogira */
router.get('/:id', ObtenerAtraccionesPorCategoria);

/* Ruta para crear nueva atraccion */
router.post('/',
    [
        check('nombreAtraccion', 'El nombre de la atraccion es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    creaAtraccion
);

/* Ruta para actualizar la atraccion */
router.put('/:id', actualizaAtraccion);

/* Ruta para eliminar la atraccion */
router.delete('/:id', eliminaAtraccion);

module.exports = router;