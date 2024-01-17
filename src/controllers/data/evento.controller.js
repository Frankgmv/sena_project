import {
    deleteEventoService, getAllEventosService, getEventoService,
    postEventoService, putEventoService
} from '../../services/data/evento.services.js'

export const postEvento = async (req, res, next) => {
    try {
        const crearEvento = await postEventoService(req.body)
        res.json(crearEvento)
        if (!crearEvento.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllEventos = async (req, res, next) => {
    try {
        const obtenerEventos = await getAllEventosService()
        res.json(obtenerEventos)
        if (!obtenerEventos.ok) return res.status(500)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getEvento = async (req, res, next) => {
    try {
        const obtenerEvento = await getEventoService(req.params.id)
        res.json(obtenerEvento)
        if (!obtenerEvento.ok) return res.status(500)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
export const putEvento = async (req, res, next) => {
    try {
        const modifEvento = await putEventoService(req.params.id, req.body)
        res.json(modifEvento)
        if (!modifEvento.ok) return res.status(500)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteEvento = async (req, res, next) => {
    try {
        const eliminarEvento = await deleteEventoService(req.params.id)
        res.json(eliminarEvento)
        if (!eliminarEvento.ok) return res.status(500)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
