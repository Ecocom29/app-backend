const { response } = require('express');
const Perfil = require('../Models/Perfil_Model');

/* Funcion para obtener los perfiles */

const obtenerPerfiles = async (req, res = response) => {

    const perfiles = await Perfil.find();

    res.json({
        ok: true,
        perfil: perfiles
    });
}

/* Funcion para crear perfil */
const creaPerfil = async (req, res = response) => {

    const perfil = new Perfil(req.body);

    try {

        const objPerfil = await Perfil.findOne({ "nombrePerfil": perfil.nombrePerfil });

        if (objPerfil) {
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un perfil con el mismo nombre, favor de verificar."
            });
        }

        const perfilGuardado = await perfil.save();
        res.json({
            ok: true,
            msg: 'Se guardo correctamente el perfil.',
            perfil: perfilGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actualizar perfil */
const actualizaPerfil = async (req, res = response) => {

    const perfilID = req.params.id;
    const uid = req.uid;

    console.log("Actualizando perfil");
    console.log(perfilID);

    try {
        const perfil = await Perfil.findById(perfilID);

        if (!perfil) {
            res.status(404).json({
                ok: false,
                msg: "El perfil no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
        /* if (perfil.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoPerfil = {
            ...req.body,
            perfiluid: uid
        }

        console.log("nuevo perfil");
        console.log(nuevoPerfil);

        const perfilActualizado = await Perfil.findByIdAndUpdate(perfilID, nuevoPerfil, { new: true });

        console.log(perfilActualizado)

        res.status(500).json({
            ok: true,
            msg: "Perfil actualizado correctamente",
            perfil: perfilActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}


/* Funcion para eliminar perfil */
const eliminaPerfil = async (req, res = response) => {

    const perfilID = req.params.id;
    const uid = req.uid;

    try {

        const perfil = await Perfil.findById(perfilID);

        if (!perfil) {
            res.status(404).json({
                ok: false,
                msg: "El perfil no se encuentra o no esta disponible."
            })
        }

        /* if (perfil.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Perfil.findByIdAndDelete(perfilID);

        res.json({
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al eliminar la informacion."
        });
    }
}

module.exports = {
    obtenerPerfiles,
    creaPerfil,
    actualizaPerfil,
    eliminaPerfil
}
