import { Sequelize, DataTypes } from 'sequelize'

const Item = Sequelize.define('Item',{
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


export default Item