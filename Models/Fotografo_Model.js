const { Schema, model } = require('mongoose');

const fotografoSchema = Schema({
    nombreFotografo: {
        type: String,
        required: true,
        unique: true
    },
    tipoFotogrago: {
        type: String,
        required: false
    },
    enlaceWeb: {
        type: String,
        required: false
    },
    enlaceFB: {
        type: String,
        required: false
    },
    enlaceING: {
        type: String,
        required: false
    },
    imagenLugar: {
        type: Schema.Types.ObjectId,
        ref: 'imagenLugar'
    }
});

//Modificar el _id a id del JSON
fotografoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('fotografos', fotografoSchema);