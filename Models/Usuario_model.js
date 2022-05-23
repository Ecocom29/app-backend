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
    imagenPerfil: {
        type: String,
        required: false
    },
    tipoUsuario: {
        type: String,
        required: false
    },
    estado: {
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
    }
});

//Modificar el _id a id del JSON
usuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('usuarios', usuarioSchema)