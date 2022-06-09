const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../Models/Usuario_model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const creaUsuario = async (req, res = response) => {
    
    const { correoElectronico, contrasenia } = req.body;

    try {

        let usuario = await Usuario.findOne({ correoElectronico });
        console.log(usuario);

        if (usuario) {

            return res.status(400).json({
                ok: false,
                msg: 'Existe un usuario con el mismo correo: ' + correoElectronico
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombres);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombres,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas'
        });
    }
};

const loginUsuario = async (req, res = response) => {

    const { correoElectronico, contrasenia } = req.body;

    try {
        let usuario = await Usuario.findOne({ correoElectronico });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }

        //Confirmar password
        const validPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta.'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombres);

        res.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombres,
            tokn: token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problemas durante el login'
        });
    }

}

/* Funcion para actualizar usuario */
const actualizaUsuario = async (req, res = response) => {

    const usuarioID = req.params.id;
    const uid = req.uid;

    try {
        const usuario = await Usuario.findById(usuarioID);

        console.log(usuario);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
        if (usuario.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar la información."
            });
        }

        const nuevoUsuario = {
            ...req.body,
            usuarioID: uid
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioID, nuevoUsuario, { new: true });

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

        if (usuario.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la información."
            });
        }

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


const validaToken = async (req, res = response) => {

    const {uid, nombres} = req;

     //Generar JWT
    const token = await generarJWT(uid, nombres);

    res.json({
        ok: true,
        msg: 'Renovando token',
        token
    })
}

module.exports = {
    creaUsuario,
    loginUsuario,
    actualizaUsuario,
    eliminaUsuario,
    validaToken
}