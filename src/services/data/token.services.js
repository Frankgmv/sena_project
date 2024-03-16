import { Op } from 'sequelize'
import Token from '../../models/data/token.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'
import bcrypt from 'bcryptjs'

const saltos = bcrypt.genSaltSync(10)

export const postTokenService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encontrarToken = await Token.findOne({
                where: {
                    [Op.or]: {
                        tokenKey: data.tokenKey,
                        nombre: data.nombre
                    }
                }
            })

            if (encontrarToken) {
                resolve({
                    ok: false,
                    message: 'TokenKey o Nombre Token en uso'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const tokenHast = bcrypt.hashSync(data.token, saltos)
            data.token = tokenHast

            const existeUsuario = await Usuario.findByPk(data.UsuarioId)

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no encontrado'
                })
            }

            const guardarToken = await Token.create(data, {
                transaction: transaccion.data
            })
            const resp = await guardarToken.save()
            if (!resp) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Token no fue creado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Token creado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllTokenService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const AllTokens = await Token.findAll()

            resolve({
                ok: true,
                message: 'Lista de Tokens',
                data: AllTokens
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getTokenService = (documento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await Token.findByPk(documento)

            if (!token) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Token obtenido',
                data: token
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getTokenByKeyService = (tokenKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await Token.findOne({
                where: {
                    tokenKey: tokenKey
                }
            })

            if (!token) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Token obtenido',
                data: token
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getTokenKeyService = (tokenKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await Token.findOne({
                where: {
                    tokenKey: tokenKey
                }
            })

            if (!token) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Token obtenido',
                data: token
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putTokenService = (documento, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encontrarToken = await Token.findByPk(documento)

            if (data.tokenKey !== 'CL_ESPECIAL' && encontrarToken.tokenKey === 'CL_ESPECIAL') {
                return resolve({
                    ok: false,
                    message: 'Nombre Inmutable'
                })
            }

            if (data.id) {
                delete data.id
            }

            if (!encontrarToken) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }
            let datosK = data
            if (data.token) {
                const tokenHast = bcrypt.hashSync(data.token, saltos)
                datosK.token = tokenHast
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const actualizarToken = await encontrarToken.update(datosK, {
                transaccion: transaccion.data
            })

            if (!actualizarToken) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Token no fue Actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Token actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteTokenService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenEliminado = await Token.findByPk(id)

            if (!tokenEliminado) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            if (tokenEliminado.tokenKey === 'CL_ESPECIAL') {
                return resolve({
                    ok: false,
                    message: 'Token inmutable'
                })
            }

            await tokenEliminado.destroy()

            resolve({
                ok: true,
                message: 'Token Eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
