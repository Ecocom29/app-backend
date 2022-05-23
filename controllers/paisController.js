const { response } = require('express');
const Pais = require('../Models/Pais_Model');

/* Funcion para obtener los paises */

const obtenerPaises = async (req, res = response) => {

    console.log('Obteniendo paises...');

    const paises = await Pais.find();

    console.log(paises);

    if (!paises) {
        res.json({
            ok: true,
            msg: "No existen registros."
        });
    }

    res.json({
        ok: true,
        pais: paises
    });
}

/* Funcion para crear perfil */
const creaPais = async (req, res = response) => {

    console.log('CREANDO PAIS...');
    console.log(req.body);

    const pais = new Pais(req.body);

    try {

        const objPais = await Pais.findOne({ "nombrePais": pais.nombrePais });

        if (objPais) {
            return res.status(404).json({
                ok: false,
                msg: "Ya existe una pais con el mismo nombre, favor de verificar."
            });
        }

        const paisGuardado = await pais.save();

        res.json({
            ok: true,
            msg: 'Se guardo correctamente el pais.',
            pais: paisGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al guardar la informacion."
        });
    }
}

/* Funcion para actualizar pais */
const actualizaPais = async (req, res = response) => {
    
    const paisID = req.params.id;
    const uid = req.uid;

    try {
        const pais = await Pais.findById(paisID);

        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: "El pais no existe o no esta disponible."
            });
        }
        // Privilegios para editar registro
       /*  if (pais.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevoPais = {
            ...req.body,
            paisuid: uid
        }

        const paisActualizado = await Pais.findByIdAndUpdate(paisID, nuevoPais, { new: true });

        res.status(500).json({
            ok: true,
            msg: "Pais actualizado correctamente",
            pais: paisActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actualizar la informacion."
        });
    }

}


/* Funcion para eliminar pais */
const eliminaPais = async (req, res = response) => {
    console.log("Eliminando pais...");
    const paisID = req.params.id;
    const uid = req.uid;

    try {

        const pais = await Pais.findById(paisID);

        console.log(pais);

        if (!pais) {
            res.status(404).json({
                ok: false,
                msg: "El pais no se encuentra o no esta disponible."
            })
        }

        /* if (pais.id.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar la informacion."
            });
        } */

        await Pais.findByIdAndDelete(paisID);

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
    obtenerPaises,
    creaPais,
    actualizaPais,
    eliminaPais
}
