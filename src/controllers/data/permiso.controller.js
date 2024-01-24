import { deletePermisoService, getAllPermisosService, getPermisoService, postPermisoService, putPermisoService
} from '../../services/data/permiso.services.js'

export const postPermiso = async (req, res, next) => {
    let {
        permiso,
        permisoKey
    } = req.body
    permisoKey = permisoKey.toUpperCase()

    try {
        const crearPermiso = await postPermisoService({
            permiso,
            permisoKey
        })

        if (!crearPermiso.ok) {
            res.status(200)
        } else res.status(201)
        res.json(crearPermiso)
    } catch (error) {
        next(error)
    }
}

export const getAllPermiso = async (req, res, next) => {
    try {
        const obtenerPermisos = await getAllPermisosService()
        res.json(obtenerPermisos)
        if (!obtenerPermisos.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getPermiso = async (req, res, next) => {
    let {
        id
    } = req.params
    try {
        const obtenerPermiso = await getPermisoService(id)

        res.json(obtenerPermiso)
        if (!obtenerPermiso.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putPermiso = async (req, res, next) => {
    let {
        params: {
            id
        },
        body: {
            permiso,
            permisoKey
        }
    } = req

    const data = {
        permiso: permiso,
        permisoKey: permisoKey.toUpperCase().trim()
    }

    try {
        const obtenerPermiso = await putPermisoService(id, data)
        res.json(obtenerPermiso)
        if (!obtenerPermiso.ok) res.status(404)
        else res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deletePermiso = async (req, res, next) => {
    try {
        const eliminarPermiso = await deletePermisoService(req.params.id)
        res.json(eliminarPermiso)
        if (!eliminarPermiso.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
