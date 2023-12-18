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
    link:{
        type:DataTypes.STRING,
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
    idCategoria:{
        type: DataTypes.INTEGER,
        references:{
            model: 'categoria',
            key: 'id',
        }
    },
    descripcion:{
        type: DataTypes.STRING,
        defaultValue:true
    }
})  