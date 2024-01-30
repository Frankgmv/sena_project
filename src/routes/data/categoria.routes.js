import { Router } from 'express'
import { getAllCategorias, getCategoria } from '../../controllers/data/categoria.controller.js'
const categoriaRouter = Router()

categoriaRouter.get('/categorias', getAllCategorias)
categoriaRouter.get('/categorias/:id', getCategoria)

export default categoriaRouter
