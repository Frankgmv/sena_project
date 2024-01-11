import { deleteNoticiaService, getAllNoticiasService, getNoticiaService, postNoticiaService, putNoticiaService 
} from "../../services/data/noticia.services.js"

export const postNoticia = async (req, res, next) => {
    try {
        const crearNoticia = await postNoticiaService(req.body);
        res.json(crearNoticia);
        if(!crearNoticia.ok) return res.status(400);
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getAllNoticias = async (req, res, next) =>{
    try {
        const {
            pagina,
            estado,
            limite
        } = req.query
        const estado_noticia = estado || "todas",
        num_pagina = parseInt(pagina || 1),
        limite_noticia = parseInt(limite || 12);

        const noticias = await getAllNoticiasService(estado_noticia, num_pagina, limite_noticia);
        res.json(noticias);
        if(!noticias.ok) return res.status(400)
        res.status(200);

    } catch (error) {
        next(error)
    }
}

export const getNoticia = async (req, res, next) =>{
    try {
        const noticias = await getNoticiaService(req.params.id);
        res.json(noticias);
        if(!noticias.ok) return res.status(404)
        res.status(200);
    } catch (error) {
        next(error)
    }
}

export const putNoticia = async (req, res, next) => {
    try {
        const actualizarNoticia = await putNoticiaService(req.params.id, req.body);
        res.json(actualizarNoticia);
        if(!crearNoticia.ok) return res.status(400);
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const deleteNoticia = async (req, res, next) =>{
    try {
        const EliminarNoticias = await deleteNoticiaService(req.params.id);
        res.json(EliminarNoticias);
        if(!EliminarNoticias.ok) return res.status(404)
        res.status(200);
    } catch (error) {
        next(error)
    }
}