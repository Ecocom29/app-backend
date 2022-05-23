const { Schema } = require('mongoose');

const redesSocialesSchema = Schema({
    nombreRed: {
        type: String,
        required: true,
        unique: true
    },
    enlaceRed: {
        type: String,
        required: true
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
    }
});

//Modificar el _id a id del JSON
redesSocialesSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('redessociales', redesSocialesSchema);
