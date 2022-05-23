const { response } = require('express');
const Atraccion = require('../Models/Atraccion_Model');


const obtenerAtracciones = async (req, res = response) => {

    const atracciones = await Atraccion.find();

    if (!atracciones) {
        return res.json({
            ok: false,
            msg: "No existen registros."
        });
    }

    res.json({
        ok: true,
        atraccion: atracciones
    });
}

/* Funcion para crear atraccion */
const creaAtraccion = async (req, res = response) => {

    const atraccion = new Atraccion(req.body);

    try {

        const objAtraccion = await Atraccion.findOne({"nombreAtraccion": atraccion.nombreAtraccion});
        
        if(objAtraccion){
            return res.status(404).json({
                ok: false,
                msg: "Ya existe una atraccion con el mismo nombre, favor de verificar."
            });
        }
        
        const atraccionGuardado = await atraccion.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente la atraccion.',
            atraccion: atraccionGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actualizar atraccion */
const actualizaAtraccion = async (req, res = response) => {

    const atraccionID = req.params.id;
    const uid = req.uid;

    try {
        const atraccion = await Atraccion.findById(atraccionID);

        if (!atraccion) {
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

        const nuevaAtraccion = {
            ...req.body,
            atraccionuid: uid
        }

        const atraccionActualizado = await Atraccion.findByIdAndUpdate(atraccionID, nuevaAtraccion, { new: true });

        console.log(atraccionActualizado)

        res.status(500).json({
            ok: true,
            msg: "Atraccion actualizado correctamente",
            atraccion: atraccionActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}

/* Funcion para eliminar el atraccion */
const eliminaAtraccion = async (req, res = response) => {

    const atraccionID = req.params.id;
    const uid = req.uid;

    try {

        const atraccion = await Atraccion.findById(atraccionID);

        if (!atraccion) {
            res.status(404).json({
                ok: false,
                msg: "La atraccion no se encuentra o no esta disponible."
            })
        }

        /* if (atraccion.perfil.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Atraccion.findByIdAndDelete(atraccionID);

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
    obtenerAtracciones,
    creaAtraccion,
    actualizaAtraccion,
    eliminaAtraccion
}
