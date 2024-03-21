import { deleteDetalleParamsPermisosService, deleteDetallePermisosService, getDetallePermisosByDocumentoService, postDetallePermisoService
} from '../../services/data/detallePermiso.services.js'

export const postDetallePermiso = async (req, res, next) => {
    try {
        const crearDetallePermiso = await postDetallePermisoService(req.body)
        res.json(crearDetallePermiso)
        if (!crearDetallePermiso.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getDetallePermisosByDocumento = async (req, res, next) => {
    try {
        const permisos = await getDetallePermisosByDocumentoService(req.params.idUsuario)

        res.json(permisos)
        if (!permisos.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
export const deleteDetallePermisos = async (req, res, next) => {
    try {
        const actualizarDetallePermiso = await deleteDetallePermisosService(req.params.idDetallePermiso)

        res.json(actualizarDetallePermiso)
        if (!actualizarDetallePermiso.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteDetallePermisosParams = async (req, res, next) => {
    try {
        const {UsuarioId, PermisoId} = req.query
        const actualizarDetallePermiso = await deleteDetalleParamsPermisosService({UsuarioId, PermisoId})

        res.json(actualizarDetallePermiso)
        if (!actualizarDetallePermiso.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
