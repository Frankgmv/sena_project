import { Router } from 'express';
import { test } from "../../controllers/test.js";

const permisoRouter = Router();

permisoRouter.get('/permisos', test);
permisoRouter.get('/permiso/:id', test);
permisoRouter.post('/noticia', test);
permisoRouter.put('/permiso/:id', test);
permisoRouter.delete('/permiso/:id', test);

export default permisoRouter;