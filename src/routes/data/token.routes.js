import { Router } from 'express'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { tokenSchema, putTokenSchema } from '../../schemas/dataSchemas.js'
import {postToken, getAllToken, getToken, putToken, deleteToken
} from '../../controllers/data/token.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const tokenRouter = Router()

tokenRouter.get('/tokens', getAllToken)
tokenRouter.get('/tokens/:id', getToken)
tokenRouter.post('/tokens', authRutas, validateSchema(tokenSchema), postToken)
tokenRouter.put('/tokens/:id', authRutas, validateSchema(putTokenSchema), putToken)
tokenRouter.delete('/tokens/:id', authRutas, deleteToken)

export default tokenRouter
