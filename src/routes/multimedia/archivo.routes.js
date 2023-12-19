import { Router } from 'express';
import { test } from "../../controllers/test.js";

const archivoRouter = Router();

archivoRouter.get('/archivo', test);
archivoRouter.get('/archivo/:id', test);
archivoRouter.post('/archivo', test);
archivoRouter.put('/archivo/:id', test);
archivoRouter.delete('/archivo/:id', test);

export default archivoRouter;