import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { historialSchema } from '../../schemas/informacionSchemas.js'
import {postHistorial, getHistorial, getAllHistorial, deleteHistorial} from '../../controllers/informacion/historial.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const historialRouter = Router()

historialRouter.get('/historial', authRutas, validarPermisos('P_HISTORIAL'), getAllHistorial)
historialRouter.get('/historial/:id', authRutas, validarPermisos('P_HISTORIAL'), getHistorial)
historialRouter.post('/historial', validateSchema(historialSchema), postHistorial)
historialRouter.delete('/historial/:id', authRutas, validarPermisos('P_ADMIN'), deleteHistorial)

export default historialRouter
