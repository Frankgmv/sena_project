import {
    getAllPermisosService
} from '../services/data/permiso.services.js'
import {
    getRolService
} from '../services/data/rol.services.js'
import {
    permisosKeyCoordinador,
    permisosKeyDocente,
    permisosKeyEstudianteEspecial,
    permisosKeyPersonalAdministrador,
    permisosKeyWM
} from '../variables.js'

export const postDetallePermisosDefault = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {RolId, id: idUsuario} = data
            let permisoAsignados

            const queryRol = await getRolService(RolId)
            if (!queryRol.ok) {
                return resolve(queryRol)
            }

            const rol = rol.data

            // consultar permisos en DB
            const queryPermisos = await getAllPermisosService()
            const permisos = queryPermisos.data

            switch (rol.rolKey) {
                case 'EST_E':
                    permisoAsignados = permisosKeyEstudianteEspecial
                    break
                case 'DOC':
                    permisoAsignados = permisosKeyDocente
                    break
                case 'P_ADM':
                    permisoAsignados = permisosKeyPersonalAdministrador
                    break
                case 'COOR':
                    permisoAsignados = permisosKeyCoordinador
                    break
                case 'WM':
                    permisoAsignados = permisosKeyWM
                    break
                default:
                    reject('Error en los permisos del Rol')
                    break
            }
            console.log(permisoAsignados)
            console.log(idUsuario)
            console.log(permisos)
        } catch (error) {
            reject(error)
        }
    })
}
