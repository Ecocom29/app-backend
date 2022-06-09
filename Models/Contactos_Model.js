const {Schema, model} = require('mongoose');

const contactoSchema = Schema({
    nombreContacto: {
        type: String,
        required: true
    },
    telefonoContacto: {
        type: String,
        required: true
    },
    correoContacto: {
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
        ref: 'perfiles'
    }
});

//Modificar el _id a id del JSON
contactoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('contactos', contactoSchema);