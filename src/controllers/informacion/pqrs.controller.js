import { postNotificacionService } from '../../services/informacion/notificacion.services.js'
import { deleteAllPqrsService, deletePqrsService, getAllPqrsService, getPqrsService, postPqrsService, putPqrsService
} from '../../services/informacion/pqrs.services.js'

export const postPqrs = async (req, res, next) => {
    try {
        const pqrsCreado = await postPqrsService(req.body)

        if (!pqrsCreado.ok) {
            return res.status(400).json(pqrsCreado)
        }

        await postNotificacionService({
            titulo: `Nuevos PQRS`,
            descripcion: `Revisa tu bandeja de PQRS`
        })

        res.status(201).json(pqrsCreado)
    } catch (err) {
        next(err)
    }
}

export const getAllPqrs = async (req, res, next) => {
    try {
        const allPqrsResponse = await getAllPqrsService()
        res.json(allPqrsResponse)
        if (!allPqrsResponse.ok) return res.status(404)
        else res.status(200)
    } catch (err) {
        next(err)
    }
}

export const getPqrs = async (req, res, next) => {
    try {
        const pqrsResponse = await getPqrsService(req.params.id)
        res.json(pqrsResponse)
        if (!pqrsResponse.ok) return res.status(400)
        else res.status(200)
    } catch (err) {
        next(err)
    }
}

export const putPqrs = async (req, res, next) => {
    try {
        const allPqrsResponse = await putPqrsService(req.params.id)
        res.json(allPqrsResponse)
        if (!allPqrsResponse) return res.status(400)
        else res.status(200)
    } catch (err) {
        next(err)
    }
}

export const deleteAllPqrs = async (req, res, next) => {
    try {
        const deleteAllPqrs = await deleteAllPqrsService()
        res.json(deleteAllPqrs)
        if (!deleteAllPqrs.ok) res.status(404)
        else res.status(200)
    } catch (err) {
        next(err)
    }
}

export const deletePqrs = async (req, res, next) => {
    try {
        const deletePqrsResponse = await deletePqrsService(req.params.id)
        res.json(deletePqrsResponse)
        if (!deletePqrsResponse.ok) res.status(404)
        else res.status(200)
    } catch (err) {
        next(err)
    }
}
