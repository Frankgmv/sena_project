import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Seccion = Sequelize.define('Seccion',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    seccion:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})  