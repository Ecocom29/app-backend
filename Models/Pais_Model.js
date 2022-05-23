const { Schema, model } = require('mongoose');

const paisSchema = Schema({
    nombrePais: {
        type: String,
        required: true,
        unique: true
    },
    descripcionPais: {
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
    atraccion: {
        type: Schema.Types.ObjectId,
        ref: 'atracciones'
    }
});

//Modificar el _id a id del JSON
paisSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('paises', paisSchema);