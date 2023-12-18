import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const DetallePermisos = Sequelize.define('DetallePermisos',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
    idPermiso:{
        type: DataTypes.INTEGER,
        references:{
            model: 'permiso',
            key: 'id',
        }
    },
})