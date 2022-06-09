const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: false
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    imagenPortada:{
        type: String,
        required: false
    },
    imagenPerfil: {
        type: String,
        required: false
    },
    nombrePerfil: {
        type: String,
        required: true,
        unique: true
    },
    ubicacionMaps:{
        type: String,
        required: false
    },
    fechaAlta: {
        type: Date,
        required: false
    },
    esActivo: {
        type: Number,
        required: false
    },
    tipoUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'tipoUsuario'
    },
});

//Modificar el _id a id del JSON
usuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('usuarios', usuarioSchema)