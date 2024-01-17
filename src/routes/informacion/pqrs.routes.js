import { Router } from 'express'
import {deleteAllPqrs, deletePqrs, getAllPqrs, getPqrs, postPqrs, putPqrs} from '../../controllers/informacion/pqrs.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { pqrsSchema } from '../../schemas/informacionSchemas.js'

const pqrsRouter = Router()

// ? Obtener todos los pqrs
pqrsRouter.get('/pqrs', getAllPqrs)

// ? Obtener un pqrs
pqrsRouter.get('/pqrs/:id', getPqrs)

// ? Publicar un pqrs
pqrsRouter.post('/pqrs', validateSchema(pqrsSchema), postPqrs)

// ? Actualizar un pqrs a leído
pqrsRouter.put('/pqrs/:id', putPqrs)

// ? Eliminar un pqrs
pqrsRouter.delete('/pqrs/:id', deletePqrs)

// ? Eliminar todos los pqrs leídos
pqrsRouter.delete('/pqrs-all', deleteAllPqrs)

export default pqrsRouter
