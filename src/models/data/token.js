import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'
import { TransactionError, TokenError } from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'
import { defaultVariables } from '../../variables.js'

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

async function insertDefaultData(dataToken) {
    try {
        await Token.sync()
        const hayToken = await Token.findOne({
            where: {
                tokenKey: dataToken.tokenKey
            }
        })

        if (!hayToken) {
            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            await Token.create(dataToken, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }
    } catch (error) {
        throw new TokenError(error)
    }
}

setTimeout(() => {
    insertDefaultData(defaultVariables.claveEspecial)
}, 6000)

export default Token
