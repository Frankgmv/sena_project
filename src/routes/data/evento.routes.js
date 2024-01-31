import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { eventoSchema, putEventoSchema } from '../../schemas/dataSchemas.js'
import { deleteEvento, getAllEventos, getEvento, postEvento, putEvento } from '../../controllers/data/evento.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const eventoRouter = Router()

eventoRouter.get('/eventos', getAllEventos)
eventoRouter.get('/eventos/:id', getEvento)
eventoRouter.post('/eventos', authRutas, validarPermisos('P_GALERIA'), validateSchema(eventoSchema), postEvento)
eventoRouter.put('/eventos/:id', authRutas, validarPermisos('P_GALERIA'), validateSchema(putEventoSchema), putEvento)
eventoRouter.delete('/eventos/:id', authRutas, validarPermisos('P_GALERIA'), deleteEvento)

export default eventoRouter
