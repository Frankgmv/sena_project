import Pqrs from '../../models/informacion/pqrs.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export function postPqrsService(pqrsData) {
    return new Promise(async (resolve, reject) => {
        try {
            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const nuevoPqrs = await Pqrs.create(pqrsData, {
                transaction: transaccion.data
            })
            const guardar = await nuevoPqrs.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'PQRS no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Pqrs registrado'
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getAllPqrsService() {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllPqrs = await Pqrs.findAll()

            if (getAllPqrs.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No hay Pqrs'
                })
            }

            resolve({
                ok: true,
                message: 'Lista de Pqrs',
                pqrs: getAllPqrs
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function putPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrsAndUpdate = await Pqrs.findByPk(idPqrs)
            if (!getPqrsAndUpdate) {
                return resolve({
                    ok: false,
                    message: 'No se encontró ningún dato para actualizar'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const updated = await getPqrsAndUpdate.update({
                estado: true
            }, {
                transaction: transaccion.data
            })

            if (!updated) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'PQRS no fue actualizado'
                })
            }

            await updated.save()

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Actualizado correctamente',
                pqrs: updated
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function getPqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const getPqrs = await Pqrs.findByPk(idPqrs)
            if (!getPqrs) {
                return resolve({
                    ok: false,
                    message: 'No se encontró ningún dato'
                })
            } else {
                resolve({
                    ok: true,
                    message: 'Datos de Pqrs',
                    pqrs: getPqrs
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}

export function deletePqrsService(idPqrs) {
    return new Promise(async (resolve, reject) => {
        try {
            const findPqrs = await Pqrs.findByPk(idPqrs)
            if (!findPqrs) {
                return resolve({
                    ok: false,
                    message: 'pqrs no encontrado'
                })
            }

            await findPqrs.destroy()
            resolve({
                ok: true,
                message: 'pqrs eliminado correctamente',
                pqrs: findPqrs
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function deleteAllPqrsService() {
    return new Promise(async (resolve, reject) => {
        try {
            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const EliminarPqrsSinLeer = await Pqrs.findAll({
                where: {
                    estado: true
                }
            })

            if (EliminarPqrsSinLeer.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No hay Pqrs sin leer'
                })
            }

            for (const pqrs of EliminarPqrsSinLeer) {
                await pqrs.destroy({
                    transaction: transaccion.data
                })
            }
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'los Pqrs leídos han sido Eliminados'
            })
        } catch (err) {
            reject(err)
        }
    })
}
