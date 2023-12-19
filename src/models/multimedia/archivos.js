import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Link = Sequelize.define('Link',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    archivo:{
        type:DataTypes.BLOB,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
})  