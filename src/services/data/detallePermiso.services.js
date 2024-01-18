import {
    Op
} from 'sequelize'
import DetallePermiso from '../../models/data/detallePermiso.js'
import Permiso from '../../models/data/permiso.js'
import Usuario from '../../models/data/usuario.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'
import t from '../../helpers/transacciones.js'

export const postDetallePermisoService = (data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const {
                UsuarioId,
                PermisoId
            } = data

            const existeUsuario = await Usuario.findByPk(UsuarioId)
            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'El usuario no existe'
                })
            }

            const existePermiso = await Permiso.findByPk(PermisoId)
            if (!existePermiso) {
                return resolve({
                    ok: false,
                    message: 'El permiso no existe'
                })
            }

            const consultarDetallePermiso = await DetallePermiso.findOne({
                where: {
                    [Op.and]: {
                        UsuarioId,
                        PermisoId
                    }
                }
            })

            if (consultarDetallePermiso) {
                return resolve({
                    ok: false,
                    message: 'El permiso ya se encuentra creado'
                })
            }

            const crearDetallePermiso = await DetallePermiso.create(data, {
                transaction: transaccion.data
            })

            if (!crearDetallePermiso) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'detallePermiso no fue creado'
                })
            }

            const detallePermisoEliminado = await crearDetallePermiso.save()

            await t.commit(transaccion.data)

            resolve({
                ok: true,
                message: 'detalle permiso creado exitosamente',
                datos: detallePermisoEliminado
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const getDetallePermisosByDocumentoService = (idUsuario) => {
    return new Promise(async (resolve, reject) => {
        try {
            const detallePermisoUsuario = await DetallePermiso.findAll({
                where: {
                    UsuarioId: idUsuario
                }
            })

            resolve({
                ok: true,
                message: ' Permisos obtenidos',
                datos: detallePermisoUsuario
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteDetallePermisosService = (idDetallePermiso) => {
    return new Promise(async (resolve, reject) => {
        try {
            const consultarDetallePermiso = await DetallePermiso.findByPk(idDetallePermiso)

            if (!consultarDetallePermiso) {
                return resolve({
                    ok: false,
                    message: 'El permiso no se encontró'
                })
            }

            await consultarDetallePermiso.destroy()

            resolve({
                ok: true,
                message: 'detalle permiso Eliminado exitosamente'
            })
        } catch (error) {
            reject(error)
        }
    })
}
