import { Router } from 'express';
import validateSchema from '../../middlewares/validarSchemas.js';
import { rolSchema } from '../../schemas/dataSchemas.js';
import { getRol, getRoles, putRol } from '../../controllers/data/rol.controller.js';

const rolRouter = Router();

rolRouter.get('/roles', getRoles);
rolRouter.get('/rol/:id', getRol);
rolRouter.put('/rol/:id', validateSchema(rolSchema), putRol);

export default rolRouter;