import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Vistas = Sequelize.define('Vistas',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    vistasTotales:{
        type: DataTypes.INTEGER,
        allowNulls: false,
    },
    vistasMes:{
        type: DataTypes.INTEGER,
        allowNulls: false,
    },
    vistasDia:{
        type: DataTypes.INTEGER,
        allowNulls: false,
    },
})