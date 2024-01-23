import { deleteLinkService, getAllLinksService, getLinksService, postLinkService, putLinkService } from '../../services/data/link.services.js'

export const postLink = async (req, res, next) => {
    try {
        const crearLink = await postLinkService(req.body)
        res.json(crearLink)

        if (!crearLink.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllLink = async (req, res, next) => {
    const { tipo } = req.query

    const tipoLinks = tipo || 'todos'

    try {
        const ObtLink = await getAllLinksService(tipoLinks)
        res.json(ObtLink)

        if (!ObtLink.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getLink = async (req, res, next) => {
    try {
        const ObtLink = await getLinksService(req.params.id)
        res.json(ObtLink)

        if (!ObtLink.ok) return res.status(400)
        res.status(201)
    } catch (error) {
        next(error)
    }
}

export const putLink = async (req, res, next) => {
    try {
        const actualizarLink = await putLinkService(req.params.id, req.body)
        res.json(actualizarLink)
        if (!actualizarLink.ok) return res.status(400)
        res.status(203)
    } catch (error) {
        next(error)
    }
}

export const deleteLink = async (req, res, next) => {
    try {
        const eliminarLink = await deleteLinkService(req.params.id)
        res.json(eliminarLink)
        if (!eliminarLink.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

