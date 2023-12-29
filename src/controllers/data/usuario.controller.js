import { postUsuarioService } from "../../services/data/usuario.services"

export const postUsuario = async (req, res, next) => {
    try {
        const crearUsuario = await postUsuarioService(req.body);
        res.json(crearUsuario)
        if(!crearUsuario.ok) return res.status(400);
        res.status(200);
    } catch (error) {
        next(error)
    }
}




