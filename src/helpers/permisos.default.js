import { postDetallePermisoDefaultService } from '../services/data/detallePermiso.services.js'
import { getAllPermisosService } from '../services/data/permiso.services.js'
import { getRolService } from '../services/data/rol.services.js'
import { getUsuarioService } from '../services/data/usuario.services.js'
import { variablesPermisos } from '../variables.js'

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

            const rol = queryRol.data
            const queryPermisos = await getAllPermisosService()
            const permisosDB = queryPermisos.data

            permisosDB.forEach(permiso => {
                if (variablesPermisos[rol.rolKey].includes(permiso.permisoKey)) {
                    permisoAsignados.push({
                        PermisoId: permiso.id,
                        UsuarioId: idUsuario,
                        permisoKey: permiso.permisoKey
                    })
                }
            })

            resolve({
                ok:true,
                data: permisoAsignados
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const postDetallePermisoDefault = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // id = Cedula usuario, RolId
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
