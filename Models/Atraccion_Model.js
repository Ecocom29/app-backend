const { Schema, model } = require('mongoose');

const atraccionSchema = Schema({
    nombreAtraccion: {
        type: String,
        required: true,
        unique: true
    },
    descripcionAtraccion: {
        type: String,
        required: false
    },
    imagenPortada: {
        type: String,
        required: false,
    },
    ubicacionMaps: {
        type: String,
        required: false,
    },
    imagenes: {
        type: Array,
        required: false,
    },
    horarioApertura: {
        type: Date,
        default: Date.now
    },
    horarioCierre: {
        type: Date,
        default: Date.now
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    fechaModificacion: {
        type: Date,
        default: Date.now
    },
    esActivo: {
        type: Number,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias'
    }
});

//Modificar el _id a id del JSON
atraccionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('atracciones', atraccionSchema);