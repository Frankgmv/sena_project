import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import Usuario from '../../models/data/usuario.js'
import Archivo from '../../models/multimedia/archivo.js'

export const postArchivoService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeUsuario = await Usuario.findByPk(data.UsuarioId)
            if (!existeUsuario) {
                return resolve({
                    ok:false,
                    message : 'Usuario no encontrado'
                })
            }

            const cuantosArchivosHay = await Archivo.findAll()

            if (cuantosArchivosHay.length !== 0) {
                return resolve({
                    ok: false,
                    message: 'Hay archivos aún, eliminalos antes'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const crearArchivo = await Archivo.create(data, {
                transaction: transaccion.data
            })

            const guardar = await crearArchivo.save()
            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Archivo no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Archivo guardado exitosamente'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getArchivoService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const archivo = await Archivo.findAll()

            if (archivo.length === 0) {
               return resolve({
                ok: false,
                message: 'No hay archivos'
               })
            }

            resolve({
                ok: true,
                data: archivo[0]
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteArchivoService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const archivos = await Archivo.findAll()

            for (let file of archivos) {
                await file.destroy()
            }

            resolve({
                ok: true,
                message: 'Archivo eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
