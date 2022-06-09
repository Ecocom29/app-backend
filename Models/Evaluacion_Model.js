const { Schema, model } = require('mongoose');

const evaluacionShema = Schema({
    comentarios: {
        type: String,
        required: false
    },
    recomendado: {
        type: Number,
        required: false
    },
    calidad: {
        type: Number,
        required: false
    },
    seguridad: {
        type: Number,
        required: false
    },
    higiene: {
        type: Number,
        required: false
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    esActivo: {
        type: Number,
        required: true
    },
    atraccion: {
        type: Schema.Types.ObjectId,
        ref: 'atracciones'
    },
    nombreUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

//Modificar el _id a id del JSON
evaluacionShema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('evaluaciones', evaluacionShema);