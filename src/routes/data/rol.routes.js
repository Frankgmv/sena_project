import { Router } from 'express';
import {  validateSchema } from '../../middlewares/validarSchemas.js';
import { rolSchema } from '../../schemas/dataSchemas.js';
import { getRol, getRoles, putRol } from '../../controllers/data/rol.controller.js';

const rolRouter = Router();

rolRouter.get('/roles', getRoles);
rolRouter.get('/roles/:id', getRol);
rolRouter.put('/roles/:id', validateSchema(rolSchema), putRol);

export default rolRouter;