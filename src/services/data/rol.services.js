import Rol from '../../models/data/rol.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const getAllRolesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await Rol.findAll()

            if (!roles) {
                return resolve({
                    ok: false,
                    mensage: 'No hay roles registrados'
                })
            }

            resolve({
                ok: true,
                mensage: 'Lista de roles',
                data: roles
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getRolService = (idRol) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rol = await Rol.findByPk(idRol)
            if (!rol) {
                return resolve({
                    ok: false,
                    mensage: `Rol no encontrado`
                })
            }

            resolve({
                ok: true,
                mensage: 'Rol obtenido',
                data: rol
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putRolService = (idRol, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ActualizarRol = await Rol.findByPk(idRol)

            if (!ActualizarRol) {
                return resolve({
                    ok: false,
                    mensage: 'Rol no encontrado'
                })
            }

             // Transaccion
            let transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }

            const actualizarRol = await ActualizarRol.update({
                estado: data.estado
            }, {transaction: transaccion.data})

            if (!actualizarRol) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Rol no fue actualizado'
                })
            }

            await t.commit(transaccion.data)
            return resolve({
                ok: true,
                mensaje: 'Rol actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
