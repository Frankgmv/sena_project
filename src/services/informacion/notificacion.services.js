import Notificaciones from '../../models/informacion/notificaciones.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postNotificacionService = (notificacionData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existe = await Notificaciones.findOne({
                where: {
                    titulo: notificacionData.titulo
                }
            })

            if (existe) {
                await existe.update({estado: false})

                return resolve({
                    ok: false,
                    message: `${notificacionData.titulo} en uso`
                })
            }

            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const notiCreada = await Notificaciones.create(notificacionData, {
                transaction: transaccion.data
            })

            const guardar = await notiCreada.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Nofificacion no fue creada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Notificación creada'
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const getAllNotificionesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const notis = await Notificaciones.findAll({
                order: [['id', 'DESC']]
            })

            resolve({
                ok: true,
                message: 'Lista de notificaciones',
                data: notis
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const getNotificionesService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNoti = await Notificaciones.findByPk(idNoti)

            if (!findNoti) {
                return resolve({
                    ok: false,
                    message: 'Notificacion no encontrada'
                })
            }

            resolve({
                ok: true,
                message: 'Notificación obtenida',
                data: findNoti
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const putNotificacionService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNoti = await Notificaciones.findByPk(idNoti)

            if (!findNoti) {
                return resolve({
                    ok: false,
                    message: 'Notificación no encontrada'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const updated = await findNoti.update({
                estado: true
            }, {
                transaction: transaccion.data
            })

            if (!updated) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Notificacion no fue actualizada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Notificación actualizado'
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteNotificacionService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findNotificaciones = await Notificaciones.findByPk(idNoti)

            if (!findNotificaciones) {
                return resolve({
                    ok: false,
                    message: 'Notificación no encontrada'
                })
            }

            await findNotificaciones.destroy()

            resolve({
                ok: true,
                message: 'Notificación eliminado'
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function deleteAllNotificacionesService() {
    return new Promise(async (resolve, reject) => {
        try {
            const EliminarNotificacionesSinLeer = await Notificaciones.findAll({
                where: {
                    estado: true
                }
            })

            if (EliminarNotificacionesSinLeer.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No hay notificaciones leídas'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            for (const notif of EliminarNotificacionesSinLeer) {
                await notif.destroy({
                    transaction: transaccion.data
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Notificaciones leídas eliminadas'
            })
        } catch (err) {
            reject(err)
        }
    })
}
