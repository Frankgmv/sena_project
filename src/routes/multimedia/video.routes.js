import { Router } from 'express';
import { test } from "../../controllers/test.js";

const videoRouter = Router();

videoRouter.get('/video', test);
videoRouter.get('/video/:id', test);
videoRouter.post('/video', test);
videoRouter.put('/video/:id', test);
videoRouter.delete('/video/:id', test);

export default videoRouter;