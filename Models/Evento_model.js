const { Schema, model } = require('mongoose');

const eventoSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    notas: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    fechaAlta: {
        type: Date,
        required: false
    },
    esActivo: {
        type: Number,
        required: false
    }
});


//Modificar el _id a id del JSON
eventoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('eventos', eventoSchema)