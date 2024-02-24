import { getDetallePermisosByDocumentoService } from '../services/data/detallePermiso.services.js'
import { getPermisoKeyService } from '../services/data/permiso.services.js'

export const validarPermisos = (permisoKey) => async (req, res, next) => {
    try {
        const documento = req.usuario.id
        const constularDetallesPermisos =  await getDetallePermisosByDocumentoService(documento)
        const consultarPermisos = await getPermisoKeyService(permisoKey)

        if (!constularDetallesPermisos.ok || !consultarPermisos.ok) {
            return res.status(404).json({
                ok: false,
                message: 'Error de credencial'
            })
        }

        const permisoEsta = constularDetallesPermisos.data.some(detallePermiso => {
            return  detallePermiso.PermisoId === consultarPermisos.data.id
        })

        if (!permisoEsta) {
            return res.status(403).json({
                ok: false,
                message: 'Accion no autorizada'
            })
        } else {
            next()
        }
    } catch (error) {
        res.status(500).json({
            error:true,
            message: error.message
        })
    }
}
