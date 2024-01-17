import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import Usuario from './usuario.js'

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNulls: false
    },
    tokenKey: {
        type: DataTypes.STRING,
        allowNulls: false,
        unique: true
    },
    tiempo: {
        type: DataTypes.STRING,
        allowNulls: false
    }
}, {
    tableName: 'Tokens',
    createdAt: true,
    updatedAt: false
})

Usuario.hasMany(Token, {primaryKey:'UsuarioId'})
Token.belongsTo(Usuario, {primaryKey:'UsuarioId'})

export default Token
