import { Router } from 'express';
import { test } from "../../controllers/test.js";

const noticiaRouter = Router();

noticiaRouter.get('/noticias', test);
noticiaRouter.get('/noticia/:id', test);
noticiaRouter.post('/noticia', test);
noticiaRouter.put('/noticia/:id', test);
noticiaRouter.delete('/noticia/:id', test);

export default noticiaRouter;