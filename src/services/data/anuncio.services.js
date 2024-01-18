import Anuncio from '../../models/data/anuncio.js'
import Seccion from '../../models/data/seccion.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'
import 'colors'

export const postAnucioService = (data) => {
    return new Promise(async (resolve, reject) => {
        // Transaccion
        let transaccion
        try {
            transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const existeTitulo = await Anuncio.findAll({
                where: {
                    titulo: data.titulo
                }
            })

            if (existeTitulo.length > 0) {
                return resolve({
                    ok: false,
                    message: 'Titulo anuncio existente.'
                })
            }

            const existeUsuario = await Usuario.findOne({
                where: {
                    id: data.UsuarioId
                }
            })

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no existe'
                })
            }

            const existeSeccion = await Seccion.findOne({
                where: {
                    id: data.SeccionId
                }
            })

            if (!existeSeccion) {
                return resolve({
                    ok: false,
                    message: 'SeccionId no existe'
                })
            }

            const crearAnuncio = await Anuncio.create(data, {
                transaction: transaccion.data
            })

            if (!crearAnuncio) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'El anuncio no se pudo crear'
                })
            }

            const response = await crearAnuncio.save()

            await t.commit(transaccion.data)
            return resolve({
                ok: true,
                message: 'Anuncio creado.',
                anuncio: response
            })
        } catch (error) {
            reject(error)
        }
    })
}
