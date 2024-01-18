import Vistas from '../../models/informacion/vistas.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postVistasService = (Vistadata) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const obtenerVisualizacion = await Vistas.findAll()

            if (obtenerVisualizacion.length !== 0) {
                return resolve({
                    ok: false
                })
            } else {
                const crearVista = await Vistas.create(Vistadata, {transaction: transaccion.data})
                const vistaCreada = await crearVista.save()

                if (!vistaCreada) {
                    await t.rollback(transaccion.data)
                    return resolve({
                        ok:false,
                        message: 'Vista no fue creado'
                    })
                }

                await t.commit(transaccion.data)
                resolve({
                    ok: true,
                    message: 'Visualización registrada',
                    vistas: vistaCreada
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}

export const getVistasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const obtenerVisualizacion = await Vistas.findAll({
                order: ['id']
            })
            if (obtenerVisualizacion.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No se encontró ningún dato',
                    vistas: obtenerVisualizacion
                })
            }

            resolve({
                ok: true,
                message: 'Visualizaciones encontradas',
                vistas: obtenerVisualizacion
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const putVistasService = () => {
    // ! hacer una de reinicio para el día y el mes
    // TODO const fecha = new Date();
    // const fechaReinicio = new Date();
    // fechaReinicio.setHours(1, 0, 0, 0);

    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            let obtenerVisualizacion = await Vistas.findAll()

            if (obtenerVisualizacion.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No se encontró ningún dato para actualizar',
                    vistas: obtenerVisualizacion
                })
            }

            obtenerVisualizacion = obtenerVisualizacion[0].dataValues
            const dataVisual = await Vistas.findByPk(obtenerVisualizacion.id)

            const dataUpdate = {
                'vistasTotales': dataVisual['vistasTotales'] + 1,
                'vistasMes': dataVisual['vistasMes'] + 1,
                'vistasDia': dataVisual['vistasDia'] + 1
            }

            const vistaUpdated = await dataVisual.update(dataUpdate, {transaction: transaccion.data})

            if (!vistaUpdated) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Vista no fue actualizada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'visualización existe, fue actualizada',
                vistas: dataVisual
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteVistasService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let obtenerVisualizacion = await Vistas.findAll()

            for (let vista of obtenerVisualizacion) {
                await vista.destroy()
            }
            resolve({
                ok: true,
                estadoVistas: 'eliminadas',
                message: 'Vistas eliminadas',
                vistas: obtenerVisualizacion
            })
        } catch (error) {
            reject(error)
        }
    })
}
