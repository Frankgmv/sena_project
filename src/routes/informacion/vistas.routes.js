import { Router } from 'express';
import { test } from "../../controllers/test.js";

const vistasRouter = Router();

vistasRouter.get('/vista', test);
vistasRouter.get('/vista/:id', test);
vistasRouter.post('/vista', test);
vistasRouter.put('/vista/:id', test);
vistasRouter.delete('/vista/:id', test);

export default vistasRouter;