import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { tokenSchema, putTokenSchema } from '../../schemas/dataSchemas.js'
import {postToken, getAllToken, getToken, putToken, deleteToken
} from '../../controllers/data/token.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const tokenRouter = Router()

tokenRouter.get('/tokens', getAllToken)
tokenRouter.get('/tokens/:id', getToken)
tokenRouter.post('/tokens', authRutas, validarPermisos('P_CLAVE_ESPECIAL'), validateSchema(tokenSchema), postToken)
tokenRouter.put('/tokens/:id', authRutas, validarPermisos('P_CLAVE_ESPECIAL'), validateSchema(putTokenSchema), putToken)
tokenRouter.delete('/tokens/:id', authRutas, validarPermisos('P_CLAVE_ESPECIAL'), deleteToken)

export default tokenRouter
