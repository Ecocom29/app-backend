

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);

        console.log('DB Online');
    } catch (error) {
        console.log(error)
        throw new Error('Error de conexion')
    }
}

module.exports = {
    dbConnection
}