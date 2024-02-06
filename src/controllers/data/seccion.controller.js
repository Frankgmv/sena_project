import { organizarDetallePermisosDefault } from '../../helpers/permisos.default.js'
import { getAllSessionesService, getSessionService } from '../../services/data/seccion.services.js'

export const getAllSecciones = async (req, res, next) => {
    try {
        const getSessiones = await getAllSessionesService()
        res.json(getSessiones)
        if (!getSessiones.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
export const getSeccion = async (req, res, next) => {
    try {
        const getSession = await getSessionService(req.params.id)
        res.json(getSession)
        if (!getSession.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getSeccionMenu = async (req, res, next) => {
    try {
        const { RolId, UsuarioId } = req.query
        if (!RolId || !UsuarioId) {
            res.status(400).json({
                ok: false,
                message: 'Inserte el RolId y el UsuarioId'
            })
        }

        const data = {
            RolId: parseInt(RolId),
            id: parseInt(UsuarioId)
        }

        const getSessionMenu = await organizarDetallePermisosDefault(data)

        res.json(getSessionMenu)
        if (!getSessionMenu.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
