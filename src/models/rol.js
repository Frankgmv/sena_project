import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Rol = Sequelize.define('Rol',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    rol:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})