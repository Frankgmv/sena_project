import {
    deleteAllNotificacionesService,
    deleteNotificacionService,
    getAllNotificionesService,
    getNotificionesService,
    postNotificacionService,
    putNotificacionService
} from "../../services/informacion/notificacion.services.js"

//? actualizar por defecto el estado de una notificacion creada a true.
export const postNotificacion = async (req, res, next) => {
    try {
        const notiCreada = await postNotificacionService(req.body);
        (notiCreada?.message_status) ? res.status(200): res.status(201)
        res.json(notiCreada);
    } catch (err) {
        next(err)
    }
}

export const getNotificaciones = async (req, res, next) => {
    try {
        const notis = await getNotificionesService(req.params.id);
        res.status(200).json(notis);
    } catch (err) {
        next(err)
    }
}
export const getAllNotificaciones = async (req, res, next) => {
    try {
        const notis = await getAllNotificionesService();
        res.status(200).json(notis);
    } catch (err) {
        next(err)
    }
}

export const putNotificacion = async (req, res, next) => {
    try {
        const actualizar = await putNotificacionService(req.params.id, req.body)

        if (!actualizar) return res.status(400).json({
            message: "No se encontró ningun archivo para actualizar"
        })

        res.status(200).json(actualizar)
    } catch (err) {
        next(err)
    }
}

export const deleteNotificacion = async (req, res, next) => {
    try {
        const eliminar = await deleteNotificacionService(req.params.id);
        res.status(200).json(eliminar)
    } catch (err) {
        next(err)
    }
}

export const deleteAllNotificaciones = async (req, res, next) => {
    try {
        const deleteAllPqrs = await deleteAllNotificacionesService();
        if (deleteAllPqrs) res.status(200).json({
            message: "Notificaciones leídas Elimindos exitosamente"
        })
        else res.status(200).json({
            message: "no hay notificaiones leídas"
        });
    } catch (err) {
        next(err);
    }
}