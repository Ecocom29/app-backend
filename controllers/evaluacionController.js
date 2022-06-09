const { response } = require('express');
const Evaluacion = require('../Models/Evaluacion_Model');

/* Funcion para obtener los perfiles */

const obtenerEvaluaciones = async (req, res = response) => {

    const evaluaciones = await Evaluacion.find();

    res.json({
        ok: true,
        evaluacion: evaluaciones
    });
}

/* Funcion para crear perfil */
const crearEvaluacion = async (req, res = response) => {

    const evaluacion = new Evaluacion(req.body);

    try {

        const objEvaluacion = await Evaluacion.findOne({ "correoElectronico": evaluacion.correoElectronico });

        /* if (objEvaluacion) {
            return res.status(404).json({
                ok: false,
                msg: "Ya existe un perfil con el mismo nombre, favor de verificar."
            });
        } */

        const evaluacionGuardada = await Evaluacion.save();
        res.json({
            ok: true,
            msg: 'Se guardo correctamente la evaluacion.',
            evaluacion: evaluacionGuardada
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
const actualizarEvaluacion = async (req, res = response) => {

    const evaluacionID = req.params.id;
    const uid = req.uid;

    console.log("Actualizando perfil");
    console.log(evaluacionID);

    try {
        const evaluacion = await Evaluacion.findById(evaluacionID);

        if (!evaluacion) {
            res.status(404).json({
                ok: false,
                msg: "La evaluacion no existe o no esta disponible."
            });
        }

        // Privilegios para editar registro
        /* if (perfil.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoEvaluacion = {
            ...req.body,
            perfiluid: uid
        }

        console.log("nuevo EVALUACION");
        console.log(nuevoEvaluacion);

        const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(evaluacionID, nuevoEvaluacion, { new: true });

        console.log(evaluacionActualizada)

        res.status(500).json({
            ok: true,
            msg: "Perfil actualizado correctamente",
            evaluacion: evaluacionActualizada
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}


/* Funcion para eliminar perfil */
const eliminarEvaluacion = async (req, res = response) => {

    const evaluacionID = req.params.id;
    const uid = req.uid;

    try {

        const evaluacion = await Evaluacion.findById(perfilID);

        if (!evaluacion) {
            res.status(404).json({
                ok: false,
                msg: "La evaluacion no se encuentra o no esta disponible."
            })
        }

        /* if (perfil.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Evaluacion.findByIdAndDelete(perfilID);

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
    obtenerEvaluaciones,
    crearEvaluacion,
    actualizarEvaluacion,
    eliminarEvaluacion
}
