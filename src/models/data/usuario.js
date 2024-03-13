import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Rol from './rol.js'
import t from '../../helpers/transacciones.js'
import { TransactionError, UsuarioError } from '../../middlewares/fabricaErrores.js'
import { defaultVariables } from '../../variables.js'

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    correo: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique:true
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
}, {
    tableName:'Usuarios',
    createdAt:true,
    updatedAt:false
})

Rol.hasMany(Usuario)
Usuario.belongsTo(Rol, {foreignKey: 'RolId'})

async function insertDefaultData(insertDefaultData) {
    try {
        await Usuario.sync()
        const exiteUsuario = await Usuario.findByPk(insertDefaultData.id)
        if (!exiteUsuario) {
            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            await Usuario.create(insertDefaultData, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }
    } catch (error) {
        throw new UsuarioError(error)
    }
}

setTimeout(() => {
    insertDefaultData(defaultVariables.usuario)
}, 3000)

export default Usuario
