import { Router } from 'express';
import { test } from "../../controllers/test.js";

const tokenRouter = Router();

tokenRouter.get('/tokens', test);
tokenRouter.get('/tokens/:id', test);
tokenRouter.post('/tokens', test);
tokenRouter.put('/tokens/:id', test);
tokenRouter.delete('/tokens/:id', test);

export default tokenRouter;