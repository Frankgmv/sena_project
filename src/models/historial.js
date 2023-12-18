import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Historial = Sequelize.define('Historial',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNulls: false,
    },
    cambio:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    descipcion:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
})