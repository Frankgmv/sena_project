import { Router } from 'express';
import { test } from "../../controllers/test.js";

const notificacionRouter = Router();

notificacionRouter.get('/notificacion', test);
notificacionRouter.get('/notificacion/:id', test);
notificacionRouter.post('/notificacion', test);
notificacionRouter.delete('/notificacion/:id', test);

export default notificacionRouter;