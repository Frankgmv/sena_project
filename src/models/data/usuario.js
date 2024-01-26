import {
    DataTypes, Op
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import Rol from './rol.js'
import usuarioDefault from '../../helpers/usuario.json' assert { type: 'json'}
import t from '../../helpers/transacciones.js'
import { UsuarioError } from '../../middlewares/fabricaErrores.js'

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
Usuario.belongsTo(Rol)

async function insertDefaultData(insertDefaultData) {
    try {
        await Usuario.sync()
        const exiteUsuario = await Usuario.findOne({
            where:{
                [Op.and]:{
                    correo: insertDefaultData.correo,
                    id: insertDefaultData.id
                }
            }
        })
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
    // insertDefaultData(usuarioDefault.data_usuario)
}, 3000);

export default Usuario
