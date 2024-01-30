import { Router } from 'express'
import {deleteAllPqrs, deletePqrs, getAllPqrs, getPqrs, postPqrs, putPqrs} from '../../controllers/informacion/pqrs.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { pqrsSchema } from '../../schemas/informacionSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const pqrsRouter = Router()

// ? Obtener todos los pqrs
pqrsRouter.get('/pqrs', authRutas, getAllPqrs)

// ? Obtener un pqrs
pqrsRouter.get('/pqrs/:id', authRutas, getPqrs)

// ? Publicar un pqrs
pqrsRouter.post('/pqrs', authRutas, validateSchema(pqrsSchema), postPqrs)

// ? Actualizar un pqrs a leído
pqrsRouter.put('/pqrs/:id', authRutas, putPqrs)

// ? Eliminar un pqrs
pqrsRouter.delete('/pqrs/:id', authRutas, deletePqrs)

// ? Eliminar todos los pqrs leídos
pqrsRouter.delete('/pqrs-delete-all', authRutas, deleteAllPqrs)

export default pqrsRouter
