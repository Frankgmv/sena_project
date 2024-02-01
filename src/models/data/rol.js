import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import { ErrorRol } from '../../middlewares/fabricaErrores.js'
import { defaultVariables } from '../../variables.js'

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    rolKey: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue: true
    }
}, {
    tableName: 'Roles',
    timestamps: false
})

async function insertDefaultData(dataRoles) {
    try {
        await Rol.sync()
        const hayRoles = await Rol.findAll()

        if (hayRoles.length === 0) {
            await Rol.bulkCreate(dataRoles)
        }
    } catch (error) {
        throw new ErrorRol(error)
    }
}

setTimeout(() => {
    insertDefaultData(defaultVariables.roles)
}, 1800)

export default Rol
