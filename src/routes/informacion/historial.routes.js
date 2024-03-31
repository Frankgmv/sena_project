import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { historialSchema } from '../../schemas/informacionSchemas.js'
import {postHistorial, getHistorial, getAllHistorial, deleteHistorial, deleteAllHistorial} from '../../controllers/informacion/historial.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const historialRouter = Router()

historialRouter.get('/historial', getAllHistorial)
historialRouter.get('/historial/:id', getHistorial)
historialRouter.post('/historial', validateSchema(historialSchema), postHistorial)
historialRouter.delete('/historial/:id', authRutas, validarPermisos('P_ADMIN'), deleteHistorial)
historialRouter.delete('/historial-all', authRutas, validarPermisos('P_ADMIN'), deleteAllHistorial)

export default (app) => app.use('/informacion', historialRouter)
