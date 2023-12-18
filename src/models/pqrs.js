import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Pqrs = Sequelize.define('Pqrs',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    apellido:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    tipo:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    reminente:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    correo:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    numeroContacto:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    mensaje:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})