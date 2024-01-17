import Permiso from '../../models/data/permiso.js'

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
                    message: 'El permiso ya existe'
                })
            }

            const nuevoPermiso = await Permiso.create(data)
            await nuevoPermiso.save()
            resolve({
                ok: true,
                mensage: 'Permiso creado correctamente',
                permiso: nuevoPermiso
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

            if (permisos.length === 0) {
                return resolve({
                    ok: false,
                    message: 'No se encontraron permisos',
                    permisos: permisos
                })
            }

            resolve({
                ok: true,
                message: 'Permisos encontrados',
                permisos: permisos
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const getPermisoService = async (idPermiso) => {
    return new Promise(async (resolve, reject) => {
        try {
            const permisos = await Permiso.findByPk(idPermiso)
            if (!permisos) {
                return resolve({
                    ok: false,
                    message: 'No se encontró el permiso',
                    permisos: permisos
                })
            }
            resolve({
                ok: true,
                message: 'Permiso encontrado',
                permisos: permisos
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
            await actulizarPermisos.update({
                permiso,
                permisoKey
            })
            resolve({
                ok: true,
                message: 'Permiso actualizado',
                permiso: actulizarPermisos
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
                message: 'Permiso eliminado',
                permiso: permiso
            })
        } catch (error) {
            reject(error)
        }
    })
}
