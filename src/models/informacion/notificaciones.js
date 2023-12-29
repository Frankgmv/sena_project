import {DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'

const Notificacion = sequelize.define('Notificacion',{
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue: false
    }
},{
    timestamps: true,
    tableName:"Notificaciones"
})


export default Notificacion