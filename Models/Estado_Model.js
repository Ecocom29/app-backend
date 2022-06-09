const { Schema, model } = require('mongoose');


const estadoSchema = Schema({
    nombreEstado: {
        type: String,
        required: true,
        unique: true
    },
    descripcionEstado: {
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
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'paises'
    }
});

//Modificar el _id a id del JSON
estadoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('estados', estadoSchema);