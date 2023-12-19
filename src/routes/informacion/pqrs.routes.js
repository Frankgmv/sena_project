import { Router } from "express";
import { test } from "../../controllers/test.js";

const pqrsRouter = Router();

pqrsRouter.get("/pqrs", test);
pqrsRouter.get("/pqrs/:id", test);
pqrsRouter.post("/pqrs", test);
pqrsRouter.delete("/pqrs", test);

export default pqrsRouter;
