import { Router } from 'express'
import { getAllSecciones, getSeccion } from '../../controllers/data/seccion.controller.js'

const seccionRouter = Router()

// TODO Agregar todas las secciones en el json de los helpers

seccionRouter.get('/secciones', getAllSecciones)
seccionRouter.get('/secciones/:id', getSeccion)

export default seccionRouter
