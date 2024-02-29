import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'

const Vistas = sequelize.define('Vistas', {
    vistasTotales: {
        type: DataTypes.INTEGER,
        allowNulls: false
    },
    vistasMes: {
        type: DataTypes.INTEGER,
        allowNulls: false
    },
    vistasDia: {
        type: DataTypes.INTEGER,
        allowNulls: false
    }
}, {
    timestamps:true
})

export default Vistas
