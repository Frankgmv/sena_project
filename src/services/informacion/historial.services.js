import Usuario from '../../models/data/usuario.js'
import Historial from '../../models/informacion/historial.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postHistorialService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeUsuario = await Usuario.findByPk(data.UsuarioId)

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'Usuario no encontrado'
                })
            }

             // Transaccion
            let transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }

            const generarRegistro = await Historial.create(data, {transaction: transaccion.data})
            const response = await generarRegistro.save()

            if (!response) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Registro no fue creado'
                })
            }
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'registro creado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllHistorialService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const registros = await Historial.findAll()

            resolve({
                ok: true,
                message: 'Lista de historial',
                data: registros
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const getHistorialService = (idHistorial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const registro = await Historial.findByPk(idHistorial)

            if (!registro) {
                return resolve({
                    ok: false,
                    message: 'Registro no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Registro encontrado',
                data: registro
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const deleteHistorialService = (idHistorial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eliminarHistorial = await Historial.findByPk(idHistorial)

            if (!eliminarHistorial) {
                return resolve({
                    ok: false,
                    message: 'Registro no encontrado'
                })
            }

            await eliminarHistorial.destroy()

            resolve({
                ok: true,
                message: 'Registro eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteAllHistorialService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const eliminarHistorial = await Historial.findAll()
            for (const historia of eliminarHistorial) {
                await historia.destroy()
            }
            resolve({
                ok: true,
                message: 'Registros eliminados'
            })
        } catch (error) {
            reject(error)
        }
    })
}
