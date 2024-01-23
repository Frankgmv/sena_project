import Video from '../../models/multimedia/video.js'
import Usuario from '../../models/data/usuario.js'
import { Op } from 'sequelize'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postVideoService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeUsuario = await Usuario.findByPk(data.UsuarioId)
            if (!existeUsuario) {
                return resolve({
                    ok: true,
                    message: 'Usuario no encontrado'
                })
            }

            const constularDatos = await Video.findOne({
                where: {
                    [Op.or]: {
                        titulo: data.titulo,
                        link: data.link
                    }
                }
            })

            if (constularDatos) {
                return resolve({
                    ok: false,
                    message: 'El titulo o link estan en uso'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const crearVideo = await Video.create(data, {transaction: transaccion.data})

            const guardar = await crearVideo.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'video no creado'
                })
            }

            await t.commit(transaccion.data)

            resolve({
                ok: true,
                message: 'Video creado',
                video: guardar
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllVideoService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const videos = await Video.findAll()

            resolve({
                ok: true,
                message: 'Videos encontrados',
                videos
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getVideoService = (idVideo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const video = await Video.findByPk(idVideo)

            if (!video) {
                return resolve({
                    ok:false,
                    message: 'video no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Videos encontrados',
                video: video.dataValues
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putVideoService = (idVideo, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                delete data.id
            }

            if (data.UsuarioId) {
                const existeUsuario = await Usuario.findByPk(idVideo)
                if (!existeUsuario) {
                    return resolve({
                        ok: true,
                        message: 'Usuario no encontrado'
                    })
                }
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const update = await Video.update(data, {transaction: transaccion.data})

            if (!update) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Video no actualizado'
                })
            }

            await t.commit(transaccion.data)

            resolve({
                ok: true,
                message: 'Video actualizado',
                video: update
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteVideoService = (idVideo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const video = await Video.findByPk(idVideo)

            if (!video) {
                return resolve({
                    ok:false,
                    message: 'video no encontrado'
                })
            }

            await video.destroy()
            resolve({
                ok: true,
                message: 'Videos eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
