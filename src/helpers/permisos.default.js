import { getDetallePermisosByDocumentoService, postDetallePermisoDefaultService } from '../services/data/detallePermiso.services.js'
import { getAllPermisosService } from '../services/data/permiso.services.js'
import { getRolService } from '../services/data/rol.services.js'
import { getUsuarioService } from '../services/data/usuario.services.js'

export const organizarDetallePermisosDefault = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { RolId, id: idUsuario } = data
            let permisoAsignados = []

            const queryRol = await getRolService(RolId)
            const queryUsuario = await getUsuarioService(idUsuario)

            if (!queryRol.ok || !queryUsuario.ok) {
                return resolve({
                    ok: false,
                    message: 'Rol o Usuario no encontrado'
                })
            }

            const queryPermisos = await getAllPermisosService()
            const permisosValidos = await getDetallePermisosByDocumentoService(idUsuario)
            let permisosDB = queryPermisos.data

            let permisosConsultados = permisosValidos.data.map(permiso => {
                return permiso.PermisoId
            })

            permisosDB.forEach(permiso => {
                if (permisosConsultados.includes(permiso.id)) {
                    permisoAsignados.push({
                        PermisoId: permiso.id,
                        UsuarioId: idUsuario,
                        permisoKey: permiso.permisoKey
                    })
                }
            })

            resolve({
                ok: true,
                data: permisoAsignados,
                data_menu: permisosDB
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const postDetallePermisoDefault = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const detallesPermisosDefault = await organizarDetallePermisosDefault(data)
            if (!detallesPermisosDefault.ok) {
                return resolve(detallesPermisosDefault)
            }

            const guardarDetalle = await postDetallePermisoDefaultService(detallesPermisosDefault.data)
            resolve(guardarDetalle)
        } catch (error) {
            reject(error)
        }
    })
}
