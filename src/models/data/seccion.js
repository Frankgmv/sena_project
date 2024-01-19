import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import {
    ErrorSeccion,
    TransactionError
} from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'

// Data json de los secciones por defecto
import seccionesPorDefecto from "../../helpers/sessiones.json" assert { type: "json" }

const Seccion = sequelize.define('Secciones', {
    seccion: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    seccionKey: {
        type: DataTypes.STRING,
        allowNulls: false,
        unique: true
    }
}, {
    timestamps: false
})

// funcion para insertar los datos de los Secciones por defecto.
async function insertDefaultData(dataSecciones) {
    let transaccion
    try {
        await Seccion.sync()

        const haySecciones = await Seccion.findAll()
        if (haySecciones.length === 0) {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            await Seccion.bulkCreate(dataSecciones, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }

    } catch (error) {
        throw new ErrorSeccion(error)
    }
}

// insertDefaultData(seccionesPorDefecto.secciones)

export default Seccion