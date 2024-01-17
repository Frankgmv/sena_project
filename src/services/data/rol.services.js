import Rol from '../../models/data/rol.js'

export const postRol = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            const ActualizarRol = await Rol.create(data)
            return resolve({
                ok: true,
                mensaje: 'Rol creado correctamente',
                rol: ActualizarRol
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
        try {
            const ActualizarRol = await Rol.findByPk(idRol)

            if (!ActualizarRol) {
                return resolve({
                    ok: false,
                    mensage: 'Rol no encontrado'
                })
            }

            await ActualizarRol.update({
                estado: data.estado
            })

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
