import { getCredencialService, putCredencialService } from '../../services/data/credencial.services.js'

export const getCredencial = async (req, res, next) => {
    try {
        const credencialDb = await getCredencialService()
        res.json(credencialDb)
        if (!credencialDb.ok) {
            return res.status(404)
        }
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const putCredencial = async (req, res, next) => {
    try {
        const actualizarCredencial = await putCredencialService(req.params.id, req.body)
        res.json(actualizarCredencial)
        if (!actualizarCredencial.ok) {
            return res.status(404)
        }
        res.status(200)
    } catch (error) {
        next(error)
    }
}
