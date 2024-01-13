import { postAnucioService } from "../../services/data/anuncio.services.js"

export const postAnuncio = async (req, res, next) => {
    try {
        res.status(200).json(req.body);
        // const crearAnuncio = await postAnucioService(req.body);
        // res.json(crearAnuncio);
        // if(!crearAnuncio.ok) return res.status(400);
        // res.status(201);
    } catch (error) {
        next(error)
    }
}
