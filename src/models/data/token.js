import {
    DataTypes
} from 'sequelize';
import {
    sequelize
} from '../../conection.js';
import Usuario from './usuario.js';

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNulls: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNulls: true
    },
    tokenKey: {
        type: DataTypes.STRING,
        allowNulls: true,
        unique: true
    },
    tiempo: {
        type: DataTypes.TEXT,
        allowNulls: true
    }
}, {
    tableName: "Tokens",
    createdAt: true,
    updatedAt: false
})

Usuario.hasMany(Token, {primaryKey:"UsuarioId"});
Token.belongsTo(Usuario, {primaryKey:"UsuarioId"});
// Token.sync({force:true})
export default Token;