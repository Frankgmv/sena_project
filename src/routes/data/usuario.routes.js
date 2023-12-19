import { Router } from 'express';
import { test } from "../../controllers/test.js";

const usuarioRouter = Router();

usuarioRouter.get('/usuarios', test);
usuarioRouter.get('/usuario/:id', test);
usuarioRouter.post('/usuario', test);
usuarioRouter.put('/usuario/:id', test);
usuarioRouter.delete('/usuario/:id', test);

export default usuarioRouter;