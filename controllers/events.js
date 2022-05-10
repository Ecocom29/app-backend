
const { response } = require('express');
const Evento = require('../Models/Evento_model');

/*
    Funcion para obtener los eventos
*/
const getEvents = async (req, res = response) => {

    const eventos = await Evento.find().populate('usuario', 'nombres');
    res.json({
        ok: true,
        msg: eventos
    })
}

/*
    Funcion para crear evento
*/
const createEvent = async (req, res = response) => {

    console.log(req.body)

    const evento = new Evento(req.body);

    try {
        evento.usuario = req.uid;

        console.log(evento);
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            msg: 'Se guardo el evento',
            evento: eventoGuardado
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
const updateEvent = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: "El evento no existe"
            });
        }

        // Privilegios para editar registro
        if (evento.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para editar."
            });
        }

        const nuevoEvento = {
            ...req.body,
            usuario: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        console.log(eventoActualizado)

        res.status(500).json({
            ok: true,
            msg: "Evento actualizado",
            evento: eventoActualizado
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
const deleteEvent = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: "El evento no existe"
            })
        }

        if (evento.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegios para eliminar."
            });
        }

        await Evento.findByIdAndDelete(eventoId);

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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}