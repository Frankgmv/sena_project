import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
// import rolesPorDefecto from "../../helpers/roles.json" assert { type: "json" };
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
    let transaccion
    try {
        // Transaccion
        transaccion = await t.create()

        if (!transaccion.ok) {
            throw new TransactionError('Error al crear transaccion')
        }
        await Rol.sync()
        const hayRoles = await Rol.findAll()

        if (hayRoles.length === 0) {
            for (let rol of dataRoles) {
                const rolCreado = Rol.create(rol, {transaction: transaccion.data})
                if (!rolCreado) {
                    t.rollback(transaccion.data)
                }
            }
        }
        await t.commit(transaccion.data)
    } catch (error) {
        throw new ErrorRol(error)
    }
}

// insertDefaultData(rolesPorDefecto.roles)
// insertDefaultData([{
//         'rol': 'Estudiante Especial',
//         'rolKey': 'EST_E'
//     },
//     {
//         'rol': 'Docente',
//         'rolKey': 'DOC'
//     },
//     {
//         'rol': 'Personal Administrativo',
//         'rolKey': 'P_ADM'
//     },
//     {
//         'rol': 'Coordinador',
//         'rolKey': 'COOR'
//     },
//     {
//         'rol': 'Web Master',
//         'rolKey': 'WM'
//     }
// ])

export default Rol
