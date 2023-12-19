import { Router } from 'express';
import { test } from "../../controllers/test.js";

const seccionRouter = Router();

seccionRouter.get('/secciones', test);
seccionRouter.get('/seccion/:id', test);
seccionRouter.post('/seccion', test);
seccionRouter.put('/seccion/:id', test);
seccionRouter.delete('/seccion/:id', test);

export default seccionRouter;