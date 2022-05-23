const { Schema, model } = require('mongoose');

const imagenLugarSchema = Schema({
    tituloImagen: {
        type: String,
        required: true,
        unique: true
    },
    descripcionImagen: {
        type: String,
        required: false,
    },
    enlaceImagen: {
        type: String,
        required: true
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
    },
    fotografo: {
        type: Schema.Types.ObjectId,
        ref: 'fotografos'
    }

});

//Modificar el _id a id del JSON
imagenLugarSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('imagenLugar', imagenLugarSchema);