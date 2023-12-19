import { Router } from 'express';
import { test } from "../../controllers/test.js";

const tokenRouter = Router();

tokenRouter.get('/tokens', test);
tokenRouter.get('/token/:id', test);
tokenRouter.post('/token', test);
tokenRouter.put('/token/:id', test);
tokenRouter.delete('/token/:id', test);

export default tokenRouter;