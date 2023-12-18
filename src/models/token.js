import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Token = Sequelize.define('Token',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNulls: false,
    },
    token:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    tiempo:{
        type:DataTypes.INTEGER,
        allowNulls: false
    },
    idusuario:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
})