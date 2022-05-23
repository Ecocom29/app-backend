const { Schema, model } = require('mongoose');

const perfilSchema = Schema({
    nombrePerfil: {
        type: String,
        required: true,
        unique: true
    },
    ubicacionMaps:{
        type: String,
        required: false
    },
    direccion:{
        type: String,
        required: false
    },
    codigoPostal:{
        type: String,
        required: false
    },
    imagenLogo:{
        type: String,
        required: false
    },
    imagenPortada:{
        type: String,
        required: false
    },
    fechaAlta:{
        type: Date,
        default: Date.now 
    },
    fechaModificacion:{
        type: Date,
        default: Date.now 
    },
    esActivo:{
        type: Number,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

//Modificar el _id a id del JSON
perfilSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('perfiles', perfilSchema);