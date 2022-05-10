const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../Models/User_model');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { correoElectronico, contrasenia } = req.body;
    console.log(req.body);

    try {

        let usuario = await User.findOne({ correoElectronico });
        console.log(usuario);

        if (usuario) {

            return res.status(400).json({
                ok: false,
                msg: 'Existe un usuario con el mismo correo: ' + correoElectronico
            })
        }

        usuario = new User(req.body);

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

const loginUser = async (req, res = response) => {
    console.log('----------LOGIN-----------')
    const { correoElectronico, contrasenia } = req.body;

    try {
        let usuario = await User.findOne({ correoElectronico });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }

        //Confirmar password
        const validPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);
        console.log(validPassword)

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

const revalidToken = async (req, res = response) => {

    console.log('----------RENEW-----------');

    const {uid, nombres} = req;

     //Generar JWT
    const token = await generarJWT(uid, nombres);

    res.json({
        ok: true,
        msg: 'Renew',
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidToken
}