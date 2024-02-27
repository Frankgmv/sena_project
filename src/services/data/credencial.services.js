import Credencial from '../../models/data/credencial.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import { validarEmail } from '../../helpers/includes.js'

export const getCredencialService = (idCredencial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const credencial = await Credencial.findAll()

            if (credencial.length === 0) {
                reject({
                    ok: false,
                    message: 'El credencial de correos esta corrupto'
                })
            }

            resolve({
                ok:true,
                message: 'Credenciales de correos obtenidos  correctamente',
                data: credencial[0]
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putCredencialService = (idCredencial, dataCredencial) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultarCredencial = await Credencial.findByPk(idCredencial)
            if (!consultarCredencial) {
                resolve({
                    ok: false,
                    message: 'El credencial de correos esta corrupto'
                })
            }

            if (dataCredencial.correo) {
                if (!validarEmail(dataCredencial.correo)) {
                    return resolve({
                        ok: false,
                        message: `Correo ${dataCredencial.correo} es inválido, solo recibe @gmail.com`
                    })
                }
            }

            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const actualizarToken = await consultarCredencial.update(dataCredencial, {
                transaccion: transaccion.data
            })

            if (!actualizarToken) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Credencial no fue Actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Credencial actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
