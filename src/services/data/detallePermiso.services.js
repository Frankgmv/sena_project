import {
    Op
} from 'sequelize'
import DetallePermiso from '../../models/data/detallePermiso.js'
import Permiso from '../../models/data/permiso.js'
import Usuario from '../../models/data/usuario.js'

export const postDetallePermisoService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                UsuarioId,
                PermisoId
            } = data

            const existeUsuario = await Usuario.findByPk(UsuarioId)
            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no encontrado'
                })
            }

            const existePermiso = await Permiso.findByPk(PermisoId)
            if (!existePermiso) {
                return resolve({
                    ok: false,
                    message: 'PermisoId no encontrado'
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
                    message: 'Permiso ya creado'
                })
            }

            const crearDetallePermiso = await DetallePermiso.create(data)

            await crearDetallePermiso.save()

            resolve({
                ok: true,
                message: 'detalle permiso creado'
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
                message: 'Lista de detalle permiso',
                data: detallePermisoUsuario
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
                    message: 'Detalle permiso no encontrado'
                })
            }

            await consultarDetallePermiso.destroy()

            resolve({
                ok: true,
                message: 'Detalle permiso eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
