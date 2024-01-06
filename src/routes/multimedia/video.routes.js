import { Router } from 'express';
import { test } from "../../controllers/test.js";

const videoRouter = Router();

videoRouter.get('/videos', test);
videoRouter.get('/videos/:id', test);
videoRouter.post('/videos', test);
videoRouter.put('/videos/:id', test);
videoRouter.delete('/videos/:id', test);

export default videoRouter;