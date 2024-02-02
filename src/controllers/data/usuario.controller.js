import { deleteDetallePermisosByDocumentoService } from '../../services/data/detallePermiso.services.js'
import { deleteUsuarioService, getAllUsuariosService, getUsuarioService, postUsuarioService, putUsuarioService
} from '../../services/data/usuario.services.js'
import { postNotificacionService } from '../../services/informacion/notificacion.services.js'

export const postUsuario = async (req, res, next) => {
    try {
        const crearUsuario = await postUsuarioService(req.body)
        res.json(crearUsuario)
        if (!crearUsuario.ok) return res.status(400)

        await postNotificacionService({
            titulo: `Nuevos Usuario`,
            descripcion: `Revisa tu bandeja de usuario`
        })

        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllUsuarios = async (req, res, next) => {
    const {
        pagina,
        estado,
        limite
    } = req.query
    const estadoUsuarios = estado || 'todos'
    const numPagina = parseInt(pagina || 1)
    const limiteUsuarios = parseInt(limite || 12)

    try {
        const usuarios = await getAllUsuariosService(estadoUsuarios, numPagina, limiteUsuarios)

        res.json(usuarios)
        if (!usuarios.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getUsuario = async (req, res, next) => {
    try {
        const id = req.params.id

        const usuario = await getUsuarioService(id)

        res.json(usuario)

        if (!usuario.ok) return res.status(400)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putUsuario = async (req, res, next) => {
    try {
        const usuarioActualizado = await putUsuarioService(req.params.id, req.body)
        res.json(usuarioActualizado)
        if (!usuarioActualizado.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteUsuario = async (req, res, next) => {
    try {
        await deleteDetallePermisosByDocumentoService(req.params.id)
        const usuarioEliminado = await deleteUsuarioService(req.params.id)

        res.json(usuarioEliminado)
        if (!usuarioEliminado.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
