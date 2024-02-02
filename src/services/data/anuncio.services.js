import Anuncio from '../../models/data/anuncio.js'
import Seccion from '../../models/data/seccion.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postAnucioService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeTitulo = await Anuncio.findAll({
                where: {
                    titulo: data.titulo
                }
            })

            if (existeTitulo.length > 0) {
                return resolve({
                    ok: false,
                    message: 'Titulo anuncio existente'
                })
            }

            const existeUsuario = await Usuario.findOne({
                where: {
                    id: data.UsuarioId
                }
            })

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'UsuarioId no existe'
                })
            }

            const existeSeccion = await Seccion.findOne({
                where: {
                    id: data.SeccionId
                }
            })

            if (!existeSeccion) {
                return resolve({
                    ok: false,
                    message: 'SeccionId no existe'
                })
            }

            let transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const crearAnuncio = await Anuncio.create(data, {
                transaction: transaccion.data
            })

            const response = await crearAnuncio.save()
            if (!response) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Anuncio no creado'
                })
            }

            await t.commit(transaccion.data)
            return resolve({
                ok: true,
                message: 'Anuncio creado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllAnunciosService = (seccionKey) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (seccionKey !== 'todos') {
                const anuncios = await Anuncio.findAll({
                    where: {
                        SeccionId: seccionKey
                    }
                })

                return resolve({
                    ok: true,
                    message: 'Lista de anuncios',
                    data: anuncios
                })
            }
            const anuncios = await Anuncio.findAll()

            resolve({
                ok: true,
                message: 'Lista de anuncios',
                data: anuncios
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAnuncioService = (idAnuncio) => {
    return new Promise(async (resolve, reject) => {
        try {
            const anuncio = await Anuncio.findByPk(idAnuncio)

            if (!anuncio) {
                return resolve({
                    ok: false,
                    message: 'Anuncio no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'Anuncio obtenido',
                data: anuncio.dataValues
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putAnuncioService = (idAnuncio, data) => {
    return new Promise(async (resolve, reject) => {
        // Transaccion
        let transaccion
        try {
            const modAnuncio = await Anuncio.findByPk(idAnuncio)

            if (!modAnuncio) {
                return resolve({
                    ok: false,
                    message: 'Anuncio no encontrado'
                })
            }

            if (data.UsuarioId) {
                const existeUsuario = await Usuario.findOne({
                    where: {
                        id: data.UsuarioId
                    }
                })

                if (!existeUsuario) {
                    return resolve({
                        ok: false,
                        message: 'UsuarioId no existe'
                    })
                }
            }

            if (data.SeccionId) {
                const existeSeccion = await Seccion.findOne({
                    where: {
                        id: data.SeccionId
                    }
                })

                if (!existeSeccion) {
                    return resolve({
                        ok: false,
                        message: 'SeccionId no existe'
                    })
                }
            }

            if (data.id) {
                delete data.id
            }

            transaccion = await t.create()
            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const updatedAnuncio = await modAnuncio.update(data, { transaction: transaccion.data })

            if (!updatedAnuncio) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Anuncio no actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Anuncio actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteAnuncioService = (idAnuncio) => {
    return new Promise(async (resolve, reject) => {
        try {
            const anuncio = await Anuncio.findByPk(idAnuncio)

            if (!anuncio) {
                return resolve({
                    ok: false,
                    message: 'Anuncio no encontrado'
                })
            }

            await anuncio.destroy()

            resolve({
                ok: true,
                message: 'Anuncio eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
