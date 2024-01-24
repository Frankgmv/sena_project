import Galeria from '../../models/multimedia/galeria.js'
import Usuario from '../../models/data/usuario.js'
import Evento from '../../models/data/evento.js'
import t from '../../helpers/transacciones.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'

export const postGaleriaService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                UsuarioId,
                EventoId
            } = data

            const existeUsuario = await Usuario.findByPk(UsuarioId)
            const existeEvento = await Evento.findByPk(EventoId)

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no encontrado'
                })
            }

            if (!existeEvento) {
                return resolve({
                    ok: false,
                    message: 'EventoId no encontrado'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const crearGaleria = await Galeria.create(data, {
                transaction: transaccion.data
            })

            const guardar = await crearGaleria.save()
            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Imagen no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Imagen guardada exitosamente.',
                imagen: guardar
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllGaleriaService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const imagenes = await Galeria.findAll()
            resolve({
                ok: true,
                message: 'Imagenes de la galeria',
                imagenes
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getGaleriaService = (idImagen) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imagen = await Galeria.findByPk(idImagen)

            if (!imagen) {
                return resolve({
                    ok: false,
                    message: 'Imágen no encontrada'
                })
            }

            resolve({
                ok: true,
                message: 'Imágen de la galeria encontrada',
                imagen : imagen.dataValues
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putGaleriaService = (idImagen, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                UsuarioId,
                EventoId
            } = data
            if (UsuarioId) {
                const existeUsuario = await Usuario.findByPk(UsuarioId)
                if (!existeUsuario) {
                    return resolve({
                        ok: false,
                        message: 'UsuarioId no encontrado'
                    })
                }
            }

            if (EventoId) {
                const existeEvento = await Evento.findByPk(EventoId)
                if (!existeEvento) {
                    return resolve({
                        ok: false,
                        message: 'EventoId no encontrado'
                    })
                }
            }

            if (data.id) {
                delete data.id
            }

            const imagen = await Galeria.findByPk(idImagen)

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const updateImagen = await imagen.update(data, {
                transaction: transaccion.data
            })

            if (!updateImagen) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Imagen no fue actualizada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Imagen creada exitosamente.',
                imagen: updateImagen
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteGaleriaService = (idImagen) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imagen = await Galeria.findByPk(idImagen)

            if (!imagen) {
                return resolve({
                    ok: true,
                    message: 'Imágen no encontrada'
                })
            }

            await imagen.destroy()
            resolve({
                ok: true,
                message: `Imágen  de la galeria "${imagen.titulo}" borrada exitosamente`
            })
        } catch (error) {
            reject(error)
        }
    })
}
