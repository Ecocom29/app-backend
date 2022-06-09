
const { response } = require('express');
const Noticia = require('../Models/Noticias_Model');

/* Funcion para obtener los eventos */
const obtenerNoticias = async (req, res = response) => {

    console.log("Obteniendo noticias");
    const noticias = await Noticia.find();
    res.json({
        ok: true,
        msg: noticias
    })
}

/* Funcion para crear evento */
const crearNoticia = async (req, res = response) => {
    
    console.log("Creando noticias");
    console.log(req.body)

    const noticia = new Noticia(req.body);

    try {
        const objNoticia = await Noticia.findOne({ "nombreNoticia": noticia.nombreNoticia });

        if (objNoticia) {
            return res.status(404).json({
                ok: false,
                msg: "Ya existe una noticia con el mismo titulo, favor de verificar."
            });
        }

        const noticiaGuardado = await noticia.save();

        res.json({
            ok: true,
            msg: 'Se guardo el evento',
            noticia: noticiaGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }

}

/*
    Funcion para actualizar los eventos
*/
const actualizarNoticia = async (req, res = response) => {

    const noticiaID = req.params.id;
    const uid = req.uid;

    try {

        const noticia = await Noticia.findById(noticiaID);

        if (!noticia) {
            res.status(404).json({
                ok: false,
                msg: "La noticia no existe."
            });
        }

        // Privilegios para editar registro
        /* if (noticia.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        } */

        const nuevaNoticia = {
            ...req.body,
            noticiauid: uid
        }

        const noticiaActualizada = await Evento.findByIdAndUpdate(noticiaID, nuevaNoticia, { new: true });

        console.log(noticiaActualizada)

        res.status(500).json({
            ok: true,
            msg: "Noticia actualizado",
            noticia: noticiaActualizada
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}

/*
    Funcion para eliminar el evento
*/
const eliminarNoticia = async (req, res = response) => {

    const noticiaID = req.params.id;
    const uid = req.uid;

    try {

        const noticia = await Noticia.findById(noticiaID);

        if (!noticia) {
            res.status(404).json({
                ok: false,
                msg: "La noticia no existe"
            })
        }

        /* if (noticia.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar."
            });
        } */

        await Noticia.findByIdAndDelete(noticiaID);

        res.json({
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}

module.exports = {
    obtenerNoticias,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia
}