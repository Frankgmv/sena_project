import Pqrs from '../../models/informacion/pqrs.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import { enviarEmail } from '../../lib/nodemailer.js'
import { config } from 'dotenv'
import { validarEmail } from '../../helpers/includes.js'

config()

export function postPqrsService(pqrsData) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!validarEmail(pqrsData.correo)) {
                return resolve({
                    ok: false,
                    message: `Correo ${pqrsData.correo} inválido, solo recibe @gmail.com`
                })
            }

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

            const messageEmail = `Nuevo PQRS en Bandeja.\n \n \t Te llego un/una ${pqrsData.tipo} de:  ${pqrsData.nombre} \n \n Mensaje. \n \n \t  ${pqrsData.mensaje}`

            await t.commit(transaccion.data)
            await enviarEmail(messageEmail, process.env.EMAIL_USER, '[I. E. Centenario de Pereira] Nuevo PQRS en plataforma')

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

            resolve({
                ok: true,
                message: 'Lista de Pqrs',
                data: getAllPqrs
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
            }
            resolve({
                ok: true,
                message: 'Datos de Pqrs',
                data: getPqrs
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
                message: 'Actualizado correctamente'
            })
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
                message: 'pqrs eliminado correctamente'
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
