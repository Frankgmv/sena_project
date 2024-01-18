import Evento from '../../models/data/evento.js'
import t from '../../helpers/transacciones.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'

export const postEventoService = (data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const existeEvento = await Evento.findOne({
                where: {
                    evento: data.evento
                }
            })
            if (existeEvento) {
                return resolve({
                    ok: false,
                    message: 'Evento ya existe.'
                })
            }

            const nuevoEvento = await Evento.create(data, {
                transaction: transaccion.data
            })

            if (!nuevoEvento) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Evento no fue creado'
                })
            }

            const guardar = await nuevoEvento.save()
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Evento creado.',
                evento: guardar
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllEventosService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const eventos = await Evento.findAll()

            resolve({
                ok: true,
                message: 'Todos los eventos',
                evento: eventos
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getEventoService = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const evento = await Evento.findByPk(idEvento)

            if (!evento) {
                return resolve({
                    ok: false,
                    message: 'Evento no existe'
                })
            }

            resolve({
                ok: true,
                message: 'eventos encontrado.',
                evento: evento
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putEventoService = (idEvento, data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const evento = await Evento.findByPk(idEvento)
            if (!evento) {
                return resolve({
                    ok: false,
                    message: 'Evento no existe'
                })
            }

            if (data.id) {
                delete data.id
            }

            const eventoActualizado = await evento.update(data, {transaction: transaccion.data})
            const updatedEvento = await eventoActualizado.save()

            if (!updatedEvento) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Evento no fue actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Evento actualizado',
                evento: eventoActualizado
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteEventoService = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eventoEncontrado = await Evento.findByPk(idEvento)
            if (!eventoEncontrado) {
                return resolve({
                    ok: false,
                    message: 'Evento no existe'
                })
            }

            await eventoEncontrado.destroy()

            resolve({
                ok: true,
                message: 'Evento Eliminado exitosamente'
            })
        } catch (error) {
            reject(error)
        }
    })
}
