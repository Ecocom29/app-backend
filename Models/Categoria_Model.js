const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombreCategoria: {
        type: String,
        required: true,
        unique: true
    },
    descripcionCategoria: {
        type: String,
        required: false,
    },
    iconoCategoria:{
        type: String,
    },
    imagenPortada:{
        type: String,
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
categoriaSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('categorias', categoriaSchema);