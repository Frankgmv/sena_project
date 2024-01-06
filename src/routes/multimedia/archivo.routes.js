import { Router } from 'express';
import { test } from "../../controllers/test.js";

const archivoRouter = Router();

archivoRouter.get('/archivos', test);
archivoRouter.get('/archivos/:id', test);
archivoRouter.post('/archivos', test);
archivoRouter.put('/archivos/:id', test);
archivoRouter.delete('/archivos/:id', test);

export default archivoRouter;