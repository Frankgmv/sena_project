import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Anuncios = Sequelize.define('Anuncios',{
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
        allowNulls: false,
    },
    imagen:{
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
    idSeccion:{
        type: DataTypes.INTEGER,
        references:{
            model: 'seccion',
            key: 'id',
        }
    },
})  