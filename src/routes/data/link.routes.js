import { Router } from 'express';
import { test } from "../../controllers/test.js";

const linkRouter = Router();

linkRouter.get('/links', test);
linkRouter.get('/link/:id', test);
linkRouter.post('/link', test);
linkRouter.put('/link/:id', test);
linkRouter.delete('/link/:id', test);

export default linkRouter;