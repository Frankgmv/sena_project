import { postTokenService, getTokenService, getAllTokenService, deleteTokenService, putTokenService
} from '../../services/data/token.services.js'
import { postNotificacionService } from '../../services/informacion/notificacion.services.js'

export const postToken = async (req, res, next) => {
    try {
       const crearToken = await postTokenService(req.body)
       res.json(crearToken)
       if (!crearToken.ok) return res.status(400)

       await postNotificacionService({
            titulo: `Se creo una nueva clave`,
            descripcion: `Revisar las claves`
        })

       res.status(201)
    } catch (error) {
        next(error)
    }
}

export const getAllToken = async (req, res, next) => {
    try {
        const traerTokens = await getAllTokenService()
        res.json(traerTokens).status(200)
    } catch (error) {
        next(error)
    }
}

export const getToken = async (req, res, next) => {
    try {
        const traerToken = await getTokenService(req.params.id)
        res.json(traerToken)
        if (!traerToken.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putToken = async (req, res, next) => {
    try {
        const actualizarToken = await putTokenService(req.params.id, req.body)
        res.json(actualizarToken)
        if (!actualizarToken.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteToken = async (req, res, next) => {
    try {
        const eliminarToken = await deleteTokenService(req.params.id)
        res.json(eliminarToken)
        if (!eliminarToken.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
