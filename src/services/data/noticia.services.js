import Noticia from '../../models/data/noticia.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import {
    TransactionError
} from '../../middlewares/fabricaErrores.js'

export const postNoticiaService = (data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            const existeNoticia = await Noticia.findOne({
                where: {
                    titulo: data.titulo
                }
            })

            const existeUsuario = await Usuario.findOne({
                where: {
                    id: data.UsuarioId
                }
            })

            if (existeNoticia) {
                return resolve({
                    ok: false,
                    message: 'La noticia ya existe'
                })
            }

            if (!existeUsuario) {
                return resolve({
                    ok: false,
                    message: 'El usuario no existe'
                })
            }

            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }
            const crearNoticia = await Noticia.create(data, {
                transaction: transaccion.data
            })

            const guardar = await crearNoticia.save()
            if (!guardar) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Noticia no fue creado'
                })
            }
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Noticia creada exitosamente.',
                noticia: guardar
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllNoticiasService = (estado, pagina, numNoticias = 12) => {
    var consulta = {
        offset: (pagina - 1) * numNoticias,
        limit: +numNoticias
    }

    return new Promise(async (resolve, reject) => {
        try {
            if (estado !== 'activas' && estado !== 'inactivas' && estado !== 'todas') {
                return resolve({
                    ok: false,
                    message: 'estado inválido',
                    estados: ['activos', 'inactivas', 'todas']
                })
            }
            if (estado !== 'todas') {
                var where = {
                    estado: {
                        $eq: estado === 'activas'
                    }
                }
                where.estado = estado === 'activas'
                consulta = {
                    ...consulta,
                    where
                }
            }
            const noticias = await Noticia.findAll(consulta)
            resolve({
                ok: true,
                totalUsuarios: noticias.length,
                limite: numNoticias,
                estado,
                pagina,
                noticias
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getNoticiaService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let noticia = await Noticia.findByPk(id)

            if (!noticia) {
                return resolve({
                    ok: false,
                    message: 'Noticia no encontrada'
                })
            }

            resolve({
                ok: true,
                message: 'Noticia encontrada exitosamente.',
                noticia: noticia
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putNoticiaService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        let transaccion
        try {
            if (data.id) {
                delete data.id
            }

            let noticia = await Noticia.findByPk(id)

            if (!noticia) {
                return resolve({
                    ok: false,
                    message: 'La noticia no existe'
                })
            }

            // Transaccion
            transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const modificarNoticia = await noticia.update(data, {
                transaction: transaccion.data
            })
            if (!modificarNoticia) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok: false,
                    message: 'Noticia no fue modificada'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: 'Noticia modificada exitosamente.',
                noticia: modificarNoticia
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteNoticiaService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let noticia = await Noticia.findByPk(id)
            if (!noticia) {
                return resolve({
                    ok: false,
                    message: 'Noticia no encontrada'
                })
            }
            await noticia.destroy()
            resolve({
                ok: true,
                message: `Noticia ${noticia.titulo}  eliminada exitosamente`
            })
        } catch (error) {
            reject(error)
        }
    })
}
