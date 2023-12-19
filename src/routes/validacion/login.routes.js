import { Router } from 'express';
import { test } from "../../controllers/test.js";

const loginRouter = Router();

loginRouter.post('/login', test);

export default loginRouter;