import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Items = Sequelize.define('Items',{
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
        type:DataTypes.BOOLEAN,
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    },
    iduser:{
        type:DataTypes.DATE,
        allowNulls: false,
        references:{
            model:'User',
            key: 'id',
        }
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})