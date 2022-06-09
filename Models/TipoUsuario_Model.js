const { Schema, model } = require('mongoose');

const tipoUsuarioSchema = Schema({
    nombreTipo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false
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
    }
});

//Modificar el _id a id del JSON
tipoUsuarioSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('tipoUsuario', tipoUsuarioSchema);