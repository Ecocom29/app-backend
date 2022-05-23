/*
    Pais Router
    /api/pais
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerPaises, creaPais, actualizaPais, eliminaPais } = require('../controllers/paisController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener los paises */
router.get('/', obtenerPaises);

/* Ruta para crear nueva pais */
router.post('/',
    [
        check('nombrePais', 'El nombre del pais es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    creaPais
);

/* Ruta para actualizar el pais */
router.put('/:id', actualizaPais);

/* Ruta para eliminar el pais */
router.delete('/:id', eliminaPais);

module.exports = router;