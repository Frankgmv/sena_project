import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { historialSchema } from '../../schemas/informacionSchemas.js'
import {postHistorial, getHistorial, getAllHistorial, deleteHistorial} from '../../controllers/informacion/historial.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const historialRouter = Router()

historialRouter.get('/historial', authRutas, getAllHistorial)
historialRouter.get('/historial/:id', authRutas, getHistorial)
historialRouter.post('/historial', authRutas, validateSchema(historialSchema), postHistorial)
historialRouter.delete('/historial/:id', authRutas, deleteHistorial)

export default historialRouter
