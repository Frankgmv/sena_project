import { Router } from 'express';
import { test } from "../../controllers/test.js";

const galeriaRouter = Router();

galeriaRouter.get('/historial', test);
galeriaRouter.get('/historial/:id', test);
galeriaRouter.post('/historial', test);
galeriaRouter.put('/historial/:id', test);

export default galeriaRouter;