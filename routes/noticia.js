/*
    Noticia Router
    /api/noticia
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerNoticias, crearNoticia, actualizarNoticia, eliminarNoticia } = require('../controllers/noticiasController');

const router = Router();

//Validar JWT
router.use(validarJWT);

//Pasar por validacion del token
//Obtener eventos
router.get('/', obtenerNoticias);

//Crear eventos
router.post('/',
    [
        check('nombreNoticia', 'El nombre obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearNoticia
);

//Actualizar eventos
router.put('/:id', actualizarNoticia);

//Eliminar eventos
router.delete('/:id', eliminarNoticia);

module.exports = router;