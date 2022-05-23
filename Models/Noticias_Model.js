const { Schema, model } = require('mongoose');

const noticiaSchema = Schema({
    nombreNoticia: {
        type: String,
        required: true
    },
    descripcionNoticia: {
        type: String,
        required: false
    },
    imagenNoticia: {
        type: String,
        required: false,
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
    perfil: {
        type: Schema.Types.ObjectId,
        ref: 'perfil'
    }
});

//Modificar el _id a id del JSON
noticiaSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('noticia', noticiaSchema);