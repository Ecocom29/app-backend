const { response } = require('express');
const Estado = require('../Models/Estado_Model');

/* Funcion para obtener los estados */

const obtenerEstados = async (req, res = response) => {
    
    const estados  = await Estado.find();

    res.json({
        ok: true,
        estados: estados
    });
}

/* Funcion para crear estado */
const crearEstado = async (req, res = response) => {

    const estado = new Estado(req.body);

    try {

        const objEstado = await Estado.findOne({"nombreEstado": estado.nombreEstado});
        
        if(objEstado){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un estado con el mismo nombre, favor de verificar."
            });
        }

        const estadoGuardado = await estado.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente el estado.',
            estado: estadoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actualizar estado */
const actualizarEstado = async (req, res = response) => {
    
    const estadoID = req.params.id;
    const uid = req.uid;

    try {
        const estado = await Estado.findById(estadoID);

        if (!estado) {
            res.status(404).json({
                ok: false,
                msg: "El estado no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
        /* if (estado.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoEstado = {
            ...req.body,
            estadouid: uid
        }

        const perfilActualizado = await Estado.findByIdAndUpdate(estadoID, nuevoEstado, { new: true });

        res.status(500).json({
            ok: true,
            msg: "Estado actualizado correctamente",
            estado: perfilActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}


/* Funcion para eliminar el evento */
const eliminaEstado = async (req, res = response) => {
    
    const estadoID = req.params.id;
    const uid = req.uid;
    try {

        const estado = await Estado.findById(estadoID);

        if (!estado) {
            res.status(404).json({
                ok: false,
                msg: "El estado no se encuentra o no esta disponible."
            })
        }

        /* if (estado.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Estado.findByIdAndDelete(estadoID);

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
    obtenerEstados,
    crearEstado,
    actualizarEstado,
    eliminaEstado
}
