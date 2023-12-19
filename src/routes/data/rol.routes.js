import { Router } from 'express';
import { test } from "../../controllers/test.js";

const rolRouter = Router();

rolRouter.get('/roles', test);
rolRouter.get('/rol/:id', test);
rolRouter.post('/rol', test);
rolRouter.put('/rol/:id', test);
rolRouter.delete('/rol/:id', test);

export default rolRouter;