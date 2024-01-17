import Categoria from '../../models/data/categoria.js'
import Link from '../../models/data/link.js'
import Seccion from '../../models/data/seccion.js'
import Usuario from '../../models/data/usuario.js'

export const postLinkService = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            UsuarioId,
            SeccionId,
            CategoriaId,
            tipo
        } = data

        if (tipo !== 'pdf' && tipo !== 'blog') {
            resolve({
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
                    mensage: 'Hubo un error con el Usuario, la Categoria o la Seccion',
                    pathError: ['CategoriaId', 'UsuarioId', 'SeccionId']
                })
            }

            // Crear Link
            const nuevoLink = new Link(data)

            // Guardar en db
            const respuesta = await nuevoLink.save()

            resolve({
                ok: true,
                message: `"${nuevoLink.titulo}" creado exitosamente`,
                usuario: respuesta
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
                    estados: ['pdf', 'blog', 'todos']
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
                total_link: links.length,
                links
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

            const linkActualizado = await link.update(data)
            await linkActualizado.save()

            resolve({
                ok: true,
                message: `"${link.titulo}" actualizado correctamente`,
                link: linkActualizado
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
                message: `"${buscarLink.titulo}" eliminado correctamente`
            })
        } catch (error) {
            reject(error)
        }
    })
}
