import { Sequelize, DataTypes } from 'sequelize'

const Token = Sequelize.define('Tokens',{
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

export default Token