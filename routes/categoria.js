/*
    Categoria Router
    /api/categoria
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const {obtenerCategorias, creaCategoria, actualizaCategoria, eliminarCategoria } = require('../controllers/categoriaController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener las categorias */
router.get('/', obtenerCategorias);

/* Ruta para crear nueva categoria */
router.post('/',
    [
        check('nombreCategoria', 'El nombre de la categoria es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    creaCategoria
);

/* Ruta para actualizar la categoria */
router.put('/:id', actualizaCategoria);

/* Ruta para eliminar la categoria */
router.delete('/:id', eliminarCategoria);

module.exports = router;