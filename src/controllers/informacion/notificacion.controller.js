import { deleteAllNotificacionesService, deleteNotificacionService, getAllNotificionesService, getNotificionesService, postNotificacionService, putNotificacionService
} from '../../services/informacion/notificacion.services.js'

// ? actualizar por defecto el estado de una notificacion creada a true.
export const postNotificacion = async (req, res, next) => {
    try {
        const notiCreada = await postNotificacionService(req.body);
        (!notiCreada.ok) ? res.status(200) : res.status(201)
        res.json(notiCreada)
    } catch (err) {
        next(err)
    }
}

export const getAllNotificaciones = async (req, res, next) => {
    try {
        const notis = await getAllNotificionesService()
        res.json(notis)
        if (!notis.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}

export const getNotificaciones = async (req, res, next) => {
    try {
        const notis = await getNotificionesService(req.params.id)
        res.json(notis)
        if (!notis.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}

export const putNotificacion = async (req, res, next) => {
    try {
        const actualizar = await putNotificacionService(req.params.id, req.body)
        res.json(actualizar)
        if (!actualizar.ok) return res.status(400)
        res.status(200)
    } catch (err) {
        next(err)
    }
}

export const deleteNotificacion = async (req, res, next) => {
    try {
        const eliminar = await deleteNotificacionService(req.params.id)
        res.json(eliminar)
        if (!eliminar.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}

export const deleteAllNotificaciones = async (req, res, next) => {
    try {
        const deleteAllPqrs = await deleteAllNotificacionesService()
        res.json(deleteAllPqrs)
        if (!deleteAllPqrs.ok) return res.status(404)
        res.status(200)
    } catch (err) {
        next(err)
    }
}
