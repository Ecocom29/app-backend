/*
    Perfil Router
    /api/perfil
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { isDate } = require('../helpers/isDate');
const { obtenerPerfiles, creaPerfil, actualizaPerfil, eliminaPerfil } = require('../controllers/perfilController');
const router = Router();

//Validar JWT
router.use(validarJWT);

/* Ruta para obtener los perfil */
router.get('/', obtenerPerfiles);

/* Ruta para crear nuevo perfil */
router.post('/',
    [
        check('nombrePerfil', 'El nombre del perfil es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    creaPerfil
);

/* Ruta para actualizar el perfil */
router.put('/:id', actualizaPerfil);

/* Ruta para eliminar el perfil */
router.delete('/:id', eliminaPerfil);

module.exports = router;
