import { getAllCategoriasService, getCategoriaService } from '../../services/data/categoria.services.js'

export const getAllCategorias = async (req, res, next) => {
    try {
        const getAllCategorias = await getAllCategoriasService()
        res.json(getAllCategorias)
        if (!getAllCategorias.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}

export const getCategoria = async (req, res, next) => {
    try {
        const getCategoria = await getCategoriaService(req.params.id)
        res.json(getCategoria)
        if (!getCategoria.ok) return res.status(404)
        res.status(200)
    } catch (error) {
        next(error)
    }
}
