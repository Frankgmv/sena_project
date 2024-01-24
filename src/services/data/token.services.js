import {
    Op
} from 'sequelize'
import Token from '../../models/data/token.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'

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
                    message: 'TokenKey o Nombre Toeken en uso'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

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
export const getTokenService = (idToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokens = await Token.findByPk(idToken)

            if (!tokens) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Token obtenido',
                data: tokens
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putTokenService = (idToken, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encontrarToken = await Token.findByPk(idToken)

            if (!encontrarToken) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const actualizarToken = await encontrarToken.update(data)

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
export const deleteTokenService = (idToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenEliminado = await Token.findByPk(idToken)

            if (!tokenEliminado) {
                return resolve({
                    ok: false,
                    message: 'Token no encontrado'
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
