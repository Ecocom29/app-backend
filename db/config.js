const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
    } catch (error) {
        console.log(error)
        throw new Error('Error de conexion a la BD, favor de verificar.')
    }
}

module.exports = {
    dbConnection
}