import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import categoriasPorDefecto from '../../helpers/categorias.json' assert { type: "json" }
import {
    ErrorCategoria,
    TransactionError
} from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'

const Categoria = sequelize.define('Categoria', {
    categoria: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    categoriaKey: {
        type: DataTypes.STRING,
        allowNulls: false,
        unique: true
    }
}, {
    tableName: 'Categorias',
    timestamps: false
})

// funcion para insertar los datos de los categorias por defecto.
async function insertDefaultData(dataCategorias) {
    try {
        // Transaccion

        await Categoria.sync()
        const haycategorias = await Categoria.findAll()
        if (haycategorias.length === 0) {
            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            await Categoria.bulkCreate(dataCategorias, {
                transaction: transaccion.data
            })
            await t.commit(transaccion.data)
        }
    } catch (error) {
        throw new ErrorCategoria(error)
    }
}

insertDefaultData(categoriasPorDefecto.categorias)

export default Categoria