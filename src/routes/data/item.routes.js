import { Router } from 'express';
import { test } from "../../controllers/test.js";

const itemRouter = Router();

itemRouter.get('/items', test);
itemRouter.get('/item/:id', test);
itemRouter.post('/item', test);
itemRouter.put('/item/:id', test);
itemRouter.delete('/item/:id', test);

export default itemRouter;