import { Router } from 'express';
import { test } from "../../controllers/test.js";
import validarSchema from "../../middlewares/validarSchemas.js"
import { usuarioSchema } from '../../schemas/dataSchemas.js';

const usuarioRouter = Router();

usuarioRouter.get('/usuarios', test);
usuarioRouter.get('/usuario/:id', test);
usuarioRouter.post('/usuario', validarSchema(usuarioSchema), test);
usuarioRouter.put('/usuario/:id', test);
usuarioRouter.delete('/usuario/:id', test);

export default usuarioRouter;