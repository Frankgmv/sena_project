import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Video = Sequelize.define('Video   ',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    linkVideo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
    tituloVideo:{
        type:DataTypes.STRING,
        allowNulls: false,
    },
    video:{
        type:DataTypes.BLOB,
        allowNulls: false,
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'evento',
            key: 'id',
        }
    },
})  