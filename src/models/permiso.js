import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Permiso = Sequelize.define('Permiso',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    permiso:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})