import { Router } from 'express';
import { test } from "../../controllers/test.js";

const noticiaRouter = Router();

noticiaRouter.get('/noticias', test);
noticiaRouter.get('/noticias/:id', test);
noticiaRouter.post('/noticias', test);
noticiaRouter.put('/noticias/:id', test);
noticiaRouter.delete('/noticias/:id', test);

export default noticiaRouter;