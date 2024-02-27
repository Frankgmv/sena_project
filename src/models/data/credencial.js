import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'
import t from '../../helpers/transacciones.js'
import { CredencialError, TransactionError } from '../../middlewares/fabricaErrores.js'
import { defaultVariables } from '../../variables.js'

const Credencial = sequelize.define('Credencial', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    correo:{
        type:DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName:  'Credenciales',
    timestamps: true
})

Usuario.hasMany(Credencial)
Credencial.belongsTo(Usuario, {foreignKey: 'UsuarioId'})
async function insertDefaultData(dataCredencial) {
    try {
        await Credencial.sync()
        const hayToken = await Credencial.findAll()

        if (hayToken.length === 0) {
            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            await Credencial.create(dataCredencial, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }
    } catch (error) {
        throw new CredencialError(error)
    }
}

setTimeout(() => {
    insertDefaultData(defaultVariables.claveCorreoNodemailer)
}, 6500)

export default Credencial
