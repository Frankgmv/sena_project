import Rol from '../../models/data/rol.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postRol = (data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const existeRol = await Rol.findOne({
                where: {
                    rol: data.rol
                }
            })
            const existeKey = await Rol.findOne({
                where: {
                    rolKey: data.rolKey
                }
            })
            if (existeRol || existeKey) {
                return resolve({
                    ok: false,
                    mensaje: 'Ya existe un rol o Llave rol igual a la que intenta registrar'
                })
            }
            const crearRol = await Rol.create(data, {transaction: transaccion.data})
            if (!crearRol) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Rol no fue creado'
                })
            }

            await t.commit(transaccion.data)
            return resolve({
                ok: true,
                mensaje: 'Rol creado correctamente',
                rol: crearRol
            })
        } catch (error) {
            return reject(error)
        }
    })
}

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
                mensage: 'Roles obtenidos correctamente',
                roles: roles
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
                mensage: 'Rol obtenido correctamente',
                rol: rol
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putRolService = (idRol, data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const ActualizarRol = await Rol.findByPk(idRol)

            if (!ActualizarRol) {
                return resolve({
                    ok: false,
                    mensage: 'Rol no encontrado'
                })
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
                mensaje: 'Rol actualizado correctamente',
                rol: ActualizarRol
            })
        } catch (error) {
            return reject(error)
        }
    })
}
