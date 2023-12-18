import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Eventos = Sequelize.define('Eventos',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    evento:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
})  