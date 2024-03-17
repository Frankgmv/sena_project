import { postHistorialService, getHistorialService, getAllHistorialService, deleteHistorialService, deleteAllHistorialService
} from '../../services/informacion/historial.services.js'

export const postHistorial = async (req, res, next) => {
    try {
        const crearRegistro = await postHistorialService(req.body)
        res.json(crearRegistro)
        if (!crearRegistro.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllHistorial = async (req, res, next) => {
    try {
        const traerRegistros = await getAllHistorialService()
        res.json(traerRegistros).status(200)
    } catch (error) {
        next(error)
    }
}

export const getHistorial = async (req, res, next) => {
    try {
        const traerRegistro = await getHistorialService(req.params.id)
        res.json(traerRegistro)
        if (!traerRegistro.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteHistorial = async (req, res, next) => {
    try {
        const eliminarRegistro = await deleteHistorialService(req.params.id)
        res.json(eliminarRegistro)
        if (!eliminarRegistro.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteAllHistorial = async (req, res, next) => {
    try {
        const eliminarRegistro = await deleteAllHistorialService()
        res.json(eliminarRegistro)
        if (!eliminarRegistro.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
