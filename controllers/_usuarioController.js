const {response } = require('express');
const Usuario  = require('../Models/Usuario_model');

/* Funcion para obtener los usuarios */
const obtenerUsuarios = async(req, res = response)=>{
    console.log('Obteniendo usuarios...');

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios: usuarios
    });
}

/* Funcion para crear usuario */
const creaUsuario = async (req, res = response) => {

    console.log('Guardando usuario...');
    console.log(req.body);

    const usuario = new Usuario(req.body);

    try {

        const objUsuario = await Usuario.findOne({"correoElectronico": usuario.correoElectronico});
        
        if(objUsuario){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un usuario con el mismo correo electrónico, favor de verificar."
            });
        }

        const usuarioGuardado = await usuario.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente el usuario.',
            usuario: usuarioGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actulizar categoria */
const actualizaUsuario = async (req, res = response) => {

    const usuarioID = req.params.id;
    const uid = req.uid;

    try {
        const usuario = await Usuario.findById(usuarioID);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
       /*  if (categoria.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoUsuario = {
            ...req.body,
            usuarioID: uid
        }

        const usuarioActualizado = await Categoria.findByIdAndUpdate(usuarioID, nuevoUsuario, { new: true });

        console.log(usuarioActualizado)

        res.status(500).json({
            ok: true,
            msg: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}

/* Funcion para eliminar la categoria */
const eliminaUsuario = async (req, res = response) => {

    const usuarioID = req.params.id;
    const uid = req.uid;

    try {

        const usuario = await Usuario.findById(usuarioID);

        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: "El usuario no se encuentra o no esta disponible."
            })
        }

        /* if (categoria.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Usuario.findByIdAndDelete(usuarioID);

        res.json({
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al eliminar la información."
        });
    }
}

/* module.exports = {
    obtenerUsuarios,
    creaUsuario,
    actualizaUsuario,
    eliminaUsuario
} */