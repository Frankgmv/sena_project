import { Router } from 'express';
import { test } from "../../controllers/test.js";

const linkRouter = Router();

linkRouter.get('/links', test);
linkRouter.get('/links/:id', test);
linkRouter.post('/links', test);
linkRouter.put('/links/:id', test);
linkRouter.delete('/links/:id', test);

export default linkRouter;