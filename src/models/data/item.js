import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNulls: false,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    link: {
        type: DataTypes.TEXT,
        allowNulls: false
    },
    imgPath:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue: true
    }
}, {
    tableName: 'Items',
    createdAt: true,
    updatedAt: false

})

Usuario.hasMany(Item, {foreignKey: 'UsuarioId'})
Item.belongsTo(Usuario, {foreignKey: 'UsuarioId'})

export default Item
