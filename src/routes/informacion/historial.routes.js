import { Router } from 'express';
import { test } from "../../controllers/test.js";

const historialRouter = Router();

historialRouter.get('/historial', test);
historialRouter.get('/historial/:id', test);
historialRouter.post('/historial', test);
historialRouter.delete('/historial/:id', test);

export default historialRouter;