import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'

const Item = sequelize.define('Items',{
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
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
},{
    tableName:"Items",
    timestamps:true
})

export default Item