import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { rolSchema } from '../../schemas/dataSchemas.js'
import { getRol, getRoles, putRol } from '../../controllers/data/rol.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const rolRouter = Router()

rolRouter.get('/roles', getRoles)
rolRouter.get('/roles/:id', authRutas, getRol)
rolRouter.put('/roles/:id', authRutas, validateSchema(rolSchema), putRol)

export default rolRouter
