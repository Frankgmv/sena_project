import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Notificaciones = Sequelize.define('Notificaciones',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})