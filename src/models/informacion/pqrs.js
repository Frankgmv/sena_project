import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'

const Pqrs = sequelize.define('Pqrs', {
    nombre: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    remitente: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    numeroContacto: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNulls: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    createdAt:true,
    updatedAt:false
})

export default Pqrs
