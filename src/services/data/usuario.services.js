import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import Usuario from '../../models/data/usuario.js'
import Rol from '../../models/data/rol.js'
import { esMayorDe15, validarEmail, validarPassword } from '../../helpers/includes.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import { postDetallePermisoDefault } from '../../helpers/permisos.default.js'

const saltos = bcrypt.genSaltSync(10)

export const postUsuarioService = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            id: documento,
            fechaNacimiento,
            correo: email,
            password,
            RolId
        } = data
        const emailLower = email.toLowerCase()
        try {
            // constular usuarios
            const isInto = await Usuario.findOne({
                where: {
                    [Op.or]: {
                        id: documento,
                        correo: emailLower
                    }
                }
            })

            //  consultar roles
            const existeRol = await Rol.findByPk(RolId)

            // Validar que el rol exista
            if (!existeRol) {
                return resolve({
                    ok: false,
                    message: 'Rol no encontrado'
                })
            }

            // validar que no existan correo o id en uso
            if (isInto) {
                return resolve({
                    ok: false,
                    message: 'Correo o Documento ya en uso'
                })
            }

            // validar email
            if (!validarEmail(email)) {
                return resolve({
                    ok: false,
                    message: `Correo ${email} es inválido, solo recibe @gmail.com`
                })
            }

            // validar password
            if (!validarPassword(password)) {
                return resolve({
                    ok: false,
                    message: 'Contraseña Inválida. \n Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial'
                })
            }

            // Validar la edad mayor a 15
            if (!esMayorDe15(fechaNacimiento)) {
                return resolve({
                    ok: false,
                    message: 'No eres mayor de 15 años'
                })
            }

            // Encriptar
            const passwordHast = bcrypt.hashSync(password, saltos)

             // Transaccion
            let transaccion = await t.create()

             if (!transaccion.ok) {
                 throw new TransactionError('Error al crear transaccion')
             }

            // Crear usuario
            const nuevoUsuario = await Usuario.create({
                ...data,
                correo: emailLower,
                password: passwordHast
            }, {transaction: transaccion.data})

            // Guardar en db
            const respuesta = await nuevoUsuario.save()

            if (!respuesta) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Usuario no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'usuario registrado, esperar habilitación de web master'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllUsuariosService = (estado, pagina, numUsuarios = 12) => {
    var consulta = {
        offset: (pagina - 1) * numUsuarios,
        limit: +numUsuarios
    }

    return new Promise(async (resolve, reject) => {
        try {
            if (estado !== 'activos' && estado !== 'inactivos' && estado !== 'todos') {
                return resolve({
                    ok: false,
                    message: 'estado inválido',
                    estados: ['activos', 'inactivos', 'todos']
                })
            }

            if (estado !== 'todos') {
                var where = {
                    estado: {
                        $eq: estado === 'activos'
                    }
                }
                where.estado = estado === 'activos'
                consulta = {
                    ...consulta,
                    where
                }
            }

            const usuarios = await Usuario.findAll(consulta)

            resolve({
                ok: true,
                message: 'Lista de usuarios',
                totalUsuarios: usuarios.length,
                limite: numUsuarios,
                estado,
                pagina,
                data: usuarios
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message: 'usuario no encontrado'
                })
            }

            resolve({
                ok: true,
                messge: 'usuario obtenido',
                data: usuario
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putUsuarioService = (idUser, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                delete data.id
            }

            const usuario = await Usuario.findByPk(idUser)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message:  'Usuario no encontrado'
                })
            }
            if (data.RolId) {
                //  consultar roles
                const existeRol = await Rol.findByPk(data.RolId)

                // Validar que el rol exista
                if (!existeRol) {
                    return resolve({
                        ok: false,
                        message: 'Rol no encontrado'
                    })
                }
            }

            if (data.correo) {
                // validar email
                if (!validarEmail(data.correo)) {
                    return resolve({
                        ok: false,
                        message: `Correo ${data.correo} es inválido, solo recibe @gmail.com`
                    })
                }
            }

            let dataNueva = data

            if (data.password) {
                // validar password
                if (!validarPassword(data.password)) {
                    return resolve({
                        ok: false,
                        message: 'Contraseña Inválida. \n Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial'
                    })
                }

                dataNueva.password = bcrypt.hashSync(data.password, saltos)
            }

            if (data.estado === true) {
                const respPermisos = await postDetallePermisoDefault({id: idUser, RolId: usuario.RolId})

                if (!respPermisos.ok) {
                    return resolve({
                        ok: false,
                        message: 'No se pudo asignar permisos por defecto'
                    })
                }
            }

             // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const usuarioActualizado = await usuario.update(dataNueva, {transaction: transaccion.data})

            if (!usuarioActualizado) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Usuario no fue actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: ' Usuario Actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message: 'usuario no encontrado'
                })
            }
            await usuario.destroy()

            resolve({
                ok: true,
                message: ' Usuario Eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
