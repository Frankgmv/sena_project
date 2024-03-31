import { Router } from 'express'
import {deleteAllPqrs, deletePqrs, getAllPqrs, getPqrs, postPqrs, putPqrs} from '../../controllers/informacion/pqrs.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { pqrsSchema } from '../../schemas/informacionSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const pqrsRouter = Router()

pqrsRouter.get('/pqrs', getAllPqrs)

pqrsRouter.get('/pqrs/:id', getPqrs)

pqrsRouter.post('/pqrs', validateSchema(pqrsSchema), postPqrs)

pqrsRouter.put('/pqrs/:id', authRutas, validarPermisos('P_PQRS'), putPqrs)

pqrsRouter.delete('/pqrs/:id', authRutas, validarPermisos('P_PQRS'), deletePqrs)

// ? Eliminar todos los pqrs leídos
pqrsRouter.delete('/pqrs-delete-all', authRutas, validarPermisos('P_PQRS'), deleteAllPqrs)

export default (app) => app.use('/informacion', pqrsRouter)
