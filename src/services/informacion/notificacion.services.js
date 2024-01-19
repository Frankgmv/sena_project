import Notificaciones from '../../models/informacion/notificaciones.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postNotificacionService = (notificacionData) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const existe = await Notificaciones.findOne({
                where: {
                    titulo: notificacionData.titulo
                }
            })

            if (existe) {
                return resolve({
                    ok: false,
                    message: `${notificacionData.titulo} ya existe`,
                    notificacion: existe
                })
            } else {
                const notiCreada = await Notificaciones.create(notificacionData, {transaction: transaccion.data})
                const guardar = await notiCreada.save()
                if (!guardar) {
                    await t.rollback(transaccion.data)
                    return resolve({
                        ok:false,
                        message: 'Nofificacion no fue creada'
                    })
                }

                await t.commit(transaccion.data)
                resolve({
                    ok: true,
                    message: 'Notificación creada',
                    notificacion: guardar
                })
            }
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
                    message: 'No se encontró ningún dato'
                })
            }

            resolve({
                ok: true,
                message: 'Notificación encontrada',
                notificacion: findNoti
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
                orderBy: ['id']
            })
            if (notis.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No hay notificaciones'
                })
            }
            resolve({
                ok: true,
                message: 'Lista de notificaciones',
                notificaciones: notis
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const putNotificacionService = (idNoti) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            const findNoti = await Notificaciones.findByPk(idNoti)
            if (!findNoti) {
                return resolve({
                    ok: false,
                    message: 'Notificación no encontrada'
                })
            }

             // Transaccion
             transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }

            const updated = await findNoti.update({
                estado: true
            }, {transaction: transaccion.data})

            if (!updated) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Notificacion no fue creada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Actualizado correctamente',
                notificacion: updated
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
                message: 'Notificación Eliminado correctamente',
                notificacion: findNotificaciones
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function deleteAllNotificacionesService() {
    return new Promise(async (resolve, reject) => {
        let transaccion
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
             transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }

            for (const notif of EliminarNotificacionesSinLeer) {
                await notif.destroy({transaction: transaccion.data})
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Notificaciones leídas eliminadas correctamente'
            })
        } catch (err) {
            reject(err)
        }
    })
}
