import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Categoria = Sequelize.define('Categoria',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    categoria:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})  