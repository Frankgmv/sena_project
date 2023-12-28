import { getAllSessionesService, getSessionService } from "../../services/data/seccion.services.js"

export const getAllSecciones = async (req, res, next) => {
    try {
        const getSessiones = await getAllSessionesService();
        res.json(getSessiones);
        if (!getSessiones.ok) return res.status(404);
        res.status(200);
    } catch (error) {
        next(error)
    }
}
export const getSeccion = async (req, res, next) => {
    try {
        const getSession = await getSessionService(req.params.id);
        res.json(getSession);
        if (!getSession.ok) return res.status(404);
        res.status(200);
    } catch (error) {
        next(error)
    }
}