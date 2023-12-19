import { Router } from 'express';
import { test } from "../../controllers/test.js";

const categoriaRouter = Router();

categoriaRouter.get('/categorias', test);
categoriaRouter.get('/categoria/:id', test);
categoriaRouter.post('/categoria', test);
categoriaRouter.put('/categoria/:id', test);
categoriaRouter.delete('/categoria/:id', test);

export default categoriaRouter;