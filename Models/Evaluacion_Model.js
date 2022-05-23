const { Schema, model } = require('mongoose');

const evaluacionShema = Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true
    },
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
    }
});

//Modificar el _id a id del JSON
evaluacionShema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('evaluacion', evaluacionShema);