import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'

const Evento = sequelize.define('Evento', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
        primaryKey:true
    },
    evento:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    }
}, {
    tableName:'Eventos',
    timestamps:false
})

export default Evento
