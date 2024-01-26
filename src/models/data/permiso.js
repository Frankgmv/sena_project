import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'

// fabrica de error personalizado
import {
    ErrorPermiso,
    TransactionError
} from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'
// Datos de los permisos
import permisosPorDefecto from "./../../helpers/permisos.json" assert { type: "json" }

const Permiso = sequelize.define('Permiso', {
    permiso: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    permisoKey: {
        type: DataTypes.STRING,
        allowNulls: false
    }
}, {
    // tableName:"Permisos",
    createdAt: true,
    updatedAt: false
})

// funcion para insertar los datos de los permisos por defecto.
async function insertDefaultData(dataPermisos) {
    
    try {
        
        await Permiso.sync()
        const hayPermisos = await Permiso.findAll()
        if (hayPermisos.length === 0) {
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            await Permiso.bulkCreate(dataPermisos, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }
    } catch (error) {
        throw new ErrorPermiso(error)
    }
}

// insertDefaultData(permisosPorDefecto.permisos)

export default Permiso