const { response } = require('express');
const TipoUsuario = require('../Models/TipoUsuario_Model');

/* Funcion para obtener tipo usuario */
const ObtenerTipoUsuario = async (req, res = response) => {

    const tipoUsuario = await TipoUsuario.find();

    if (!tipoUsuario) {
        return res.json({
            ok: false,
            msg: "No existen registros."
        });
    }

    res.json({
        ok: true,
        tipoUsuario: tipoUsuario
    });
}

/* Funcion para crear tipo usuario */
const crearTipoUsuario = async (req, res = response) => {

    const tipoUsuario = new TipoUsuario(req.body);

    try {

        const objtipoUsuario = await TipoUsuario.findOne({"nombreTipo": tipoUsuario.nombreTipo});
        
        if(objtipoUsuario){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un tipo de usuario con el mismo nombre, favor de verificar."
            });
        }
        
        const tipoUsuarioGuardado = await tipoUsuario.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente el tipo de usuario.',
            tipoUsuario: tipoUsuarioGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actualizar tipo usuario */
const actualizarTipoUsuario = async (req, res = response) => {

    const tipoUsuarioID = req.params.id;
    const uid = req.uid;

    try {

        const tipoUsuario = await TipoUsuario.findById(tipoUsuarioID);

        if (!tipoUsuario) {
            res.status(404).json({
                ok: false,
                msg: "El perfil no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
       /*  if (atraccion.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoTipoUsuario = {
            ...req.body,
            tipoUsuarioID: uid
        }

        const tipoUsuarioActualizado = await TipoUsuario.findByIdAndUpdate(tipoUsuarioID, nuevoTipoUsuario, { new: true });

        res.status(500).json({
            ok: true,
            msg: "Atraccion actualizado correctamente",
            tipoUsuario: tipoUsuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}

/* Funcion para eliminar el tipo usuario */
const eliminarTipoUsuario = async (req, res = response) => {

    const tipoUsuarioID = req.params.id;
    const uid = req.uid;

    try {

        const tipoUsuario = await TipoUsuario.findById(tipoUsuarioID);

        if (!tipoUsuario) {
            res.status(404).json({
                ok: false,
                msg: "El tipo de usuario no se encuentra o no esta disponible."
            })
        }

        /* if (atraccion.perfil.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await TipoUsuario.findByIdAndDelete(tipoUsuarioID);

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
    ObtenerTipoUsuario,
    crearTipoUsuario,
    actualizarTipoUsuario,
    eliminarTipoUsuario
}