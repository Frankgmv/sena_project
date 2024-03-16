import Rol from '../../models/data/rol.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const getAllRolesService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await Rol.findAll()

            resolve({
                ok: true,
                message: 'Lista de roles',
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
                    message: `Rol no encontrado`
                })
            }

            resolve({
                ok: true,
                message: 'Rol obtenido',
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

            if (data.id) {
                delete data.id
            }

            if (ActualizarRol.rolKey === 'WM') {
                return resolve({
                    ok: false,
                    message: 'Rol inmutable'
                })
            }

            if (!ActualizarRol) {
                return resolve({
                    ok: false,
                    message: 'Rol no encontrado'
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
                message: 'Rol actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
