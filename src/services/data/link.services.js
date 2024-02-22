import Categoria from '../../models/data/categoria.js'
import Link from '../../models/data/link.js'
import Seccion from '../../models/data/seccion.js'
import Usuario from '../../models/data/usuario.js'
import t from '../../helpers/transacciones.js'
import { TransactionError } from '../../middlewares/fabricaErrores.js'

export const postLinkService = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            UsuarioId,
            SeccionId,
            CategoriaId,
            tipo
        } = data

        if (tipo !== 'pdf' && tipo !== 'blog') {
            return resolve({
                ok: false,
                message: 'El tipo es invalido',
                tipos: ['pdf', 'blog']
            })
        }

        try {
            const existeUsuario = await Usuario.findByPk(UsuarioId)
            const existeCategoria = await Categoria.findByPk(CategoriaId)
            const existeSeccion = await Seccion.findByPk(SeccionId)

            // Validar que las entidades existan
            if (!existeUsuario || !existeCategoria || !existeSeccion) {
                return resolve({
                    ok: false,
                    message: 'Hubo un error con el Usuario, la Categoria o la Seccion',
                    pathError: ['CategoriaId', 'UsuarioId', 'SeccionId']
                })
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            // Crear Link
            const nuevoLink = await Link.create(data, {transaction: transaccion.data})

            // Guardar en db
            const respuesta = await nuevoLink.save()

            if (!respuesta) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Link no fue creado'
                })
            }

            await t.commit(transaccion.data)

            resolve({
                ok: true,
                message: `Link creado`
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllLinksService = (tipo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (tipo !== 'pdf' && tipo !== 'blog' && tipo !== 'todos') {
                return resolve({
                    ok: false,
                    message: 'tipo inválido',
                    tipos: ['pdf', 'blog', 'todos']
                })
            }
            let consulta = {}
            if (tipo !== 'todos') {
                var where = {
                    tipo: tipo === 'blog' ? 'blog' : 'pdf'
                }

                consulta = {
                    where
                }
            }
            const links = await Link.findAll(consulta)
            resolve({
                ok: true,
                message: 'Lista de links',
                data: links
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const getLinksService = (idLink) => {
    return new Promise(async (resolve, reject) => {
        try {
            const link = await Link.findByPk(idLink)

            if (!link) {
                return resolve({
                    ok:false,
                    message: 'Link no encontrado'
                })
            }

            resolve({
                ok: true,
                message: 'link obtenido',
                data: link
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putLinkService = (idLink, data) => {
    return new Promise(async (resolve, reject) => {
        const {
            tipo
        } = data

        if (tipo) {
            if (tipo !== 'pdf' && tipo !== 'blog') {
                return resolve({
                    ok: false,
                    message: 'tipo inválido',
                    estados: ['pdf', 'blog']
                })
            }
        }

        try {
            const link = await Link.findByPk(idLink)
            if (!link) {
                return resolve({
                    ok: false,
                    message: 'link no encontrado'
                })
            }

            if (data.id) {
                delete data.id
            }

            // Transaccion
            let transaccion = await t.create()

            if (!transaccion.ok) {
                throw new TransactionError('Error al crear transaccion')
            }

            const linkActualizado = await link.update(data, {transaction: transaccion.data})

            if (!linkActualizado) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Link no fue actualizado'
                })
            }
            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: `Link actualizado`
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteLinkService = (idLink) => {
    return new Promise(async (resolve, reject) => {
        try {
            const buscarLink = await Link.findByPk(idLink)

            if (!buscarLink) {
                return resolve({
                    ok: false,
                    message: 'link no encontrado'
                })
            }
            await buscarLink.destroy()

            resolve({
                ok: true,
                message: `Link eliminado`
            })
        } catch (error) {
            reject(error)
        }
    })
}
