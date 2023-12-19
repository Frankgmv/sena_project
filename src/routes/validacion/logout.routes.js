import { Router } from 'express';
import { test } from "../../controllers/test.js";

const logoutRouter = Router();

logoutRouter.post('/logout', test);

export default logoutRouter;