import { Router } from 'express';
import validateSchema from '../../middlewares/validarSchemas.js'
import { tokenSchema, putTokenSchema } from '../../schemas/dataSchemas.js'
import { postToken, getAllToken, getToken, putToken, deleteToken} from '../../controllers/data/token.controller.js'

const tokenRouter = Router();

tokenRouter.get('/tokens', getAllToken);
tokenRouter.get('/tokens/:id', getToken);
tokenRouter.post('/tokens', validateSchema(tokenSchema), postToken);
tokenRouter.put('/tokens/:id', validateSchema(putTokenSchema), putToken);
tokenRouter.delete('/tokens/:id', deleteToken);

export default tokenRouter;