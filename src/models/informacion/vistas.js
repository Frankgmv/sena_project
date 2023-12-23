import { Sequelize, DataTypes } from 'sequelize'

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

export default Vistas