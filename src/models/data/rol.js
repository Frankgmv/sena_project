import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import rolesPorDefecto from "../../helpers/roles.json" assert { type: "json" };
import {
    ErrorRol, TransactionError
} from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'

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
            for (let rol of dataRoles) {
                const rolCreado = Rol.create(rol)
            }
        }
    } catch (error) {
        throw new ErrorRol(error)
    }
}

// insertDefaultData(rolesPorDefecto.roles)

export default Rol
