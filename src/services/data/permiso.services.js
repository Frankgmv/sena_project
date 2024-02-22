import Permiso from '../../models/data/permiso.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postPermisoService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultaKey = await Permiso.findOne({
                where: {
                    permisoKey: data.permisoKey
                }
            })

            if (consultaKey) {
                return resolve({
                    ok: false,
                    message: 'Permiso ya existe'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const nuevoPermiso = await Permiso.create(data, {
                transaction: transaccion.data
            })
            const guardar = await nuevoPermiso.save()

            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Permiso no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Permiso creado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllPermisosService = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const permisos = await Permiso.findAll()

            resolve({
                ok: true,
                message: 'Lista de permisos',
                data: permisos
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getPermisoService = async (idPermiso) => {
    return new Promise(async (resolve, reject) => {
        try {
            const permiso = await Permiso.findByPk(idPermiso)
            if (!permiso) {
                return resolve({
                    ok: false,
                    message: 'Permiso no encontrado'
                })
            }
            resolve({
                ok: true,
                message: 'Permiso obtenido',
                data: permiso
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getPermisoKeyService = async (permisoKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const permiso = await Permiso.findOne({
                where: {
                    permisoKey
                }
            })

            if (!permiso) {
                return resolve({
                    ok: false,
                    message: 'Permiso no encontrado'
                })
            }
            resolve({
                ok: true,
                message: 'Permiso obtenido',
                data: permiso
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putPermisoService = async (idPermiso, {
    permiso,
    permisoKey
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const actulizarPermisos = await Permiso.findByPk(idPermiso)
            if (!actulizarPermisos) {
                return resolve({
                    ok: false,
                    message: 'Permiso no encontrado'
                })
            }

             // Transaccion
             let transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }
            const updatedPermios = await actulizarPermisos.update({
                permiso,
                permisoKey
            }, {transaction: transaccion.data})

            if (!updatedPermios) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Permiso no fue actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Permiso actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deletePermisoService = async (idPermiso) => {
    return new Promise(async (resolve, reject) => {
        try {
            const permiso = await Permiso.findByPk(idPermiso)
            if (!permiso) {
                return resolve({
                    ok: false,
                    message: 'Permiso no encontrado'
                })
            }

            await permiso.destroy()
            resolve({
                ok: true,
                message: 'Permiso eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
