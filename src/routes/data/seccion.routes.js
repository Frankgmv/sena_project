import { Router } from 'express'
import { getAllSecciones, getSeccion, getSeccionMenu } from '../../controllers/data/seccion.controller.js'

const seccionRouter = Router()

seccionRouter.get('/secciones', getAllSecciones)
seccionRouter.get('/secciones/:id', getSeccion)
seccionRouter.get('/secciones-menu', getSeccionMenu)

export default (app) => app.use('/data', seccionRouter)
