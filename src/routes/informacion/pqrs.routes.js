import { Router } from 'express'
import {deleteAllPqrs, deletePqrs, getAllPqrs, getPqrs, postPqrs, putPqrs} from '../../controllers/informacion/pqrs.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { pqrsSchema } from '../../schemas/informacionSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const pqrsRouter = Router()

// ? Obtener todos los pqrs
pqrsRouter.get('/pqrs', authRutas, validarPermisos('P_PQRS'), getAllPqrs)

// ? Obtener un pqrs
pqrsRouter.get('/pqrs/:id', authRutas, validarPermisos('P_PQRS'), getPqrs)

// ? Publicar un pqrs
pqrsRouter.post('/pqrs', authRutas, validarPermisos('P_PQRS'), validateSchema(pqrsSchema), postPqrs)

// ? Actualizar un pqrs a leído
pqrsRouter.put('/pqrs/:id', authRutas, validarPermisos('P_PQRS'), putPqrs)

// ? Eliminar un pqrs
pqrsRouter.delete('/pqrs/:id', authRutas, validarPermisos('P_PQRS'), deletePqrs)

// ? Eliminar todos los pqrs leídos
pqrsRouter.delete('/pqrs-delete-all', authRutas, validarPermisos('P_PQRS'), deleteAllPqrs)

export default pqrsRouter
