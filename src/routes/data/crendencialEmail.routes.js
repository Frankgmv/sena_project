import { Router } from 'express'
import { getCredencial, putCredencial } from '../../controllers/data/credencial.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { credencialEmailSchema } from '../../schemas/dataSchemas.js'

const credencialRouter = Router()

credencialRouter.get('/credenciales', authRutas, validarPermisos('P_ADMIN'), getCredencial)
credencialRouter.put('/credenciales/:id', authRutas, validarPermisos('P_ADMIN'), validateSchema(credencialEmailSchema), putCredencial)

export default (app) => app.use('/data', credencialRouter)
