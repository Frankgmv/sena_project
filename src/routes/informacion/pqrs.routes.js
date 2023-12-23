import { Router } from "express";
import { deleteAllPqrs, deletePqrs, getAllPqrs, getPqrs, postPqrs, putPqrs} from "../../controllers/informacion/pqrs.controller.js";
import validateSchema from "../../middlewares/validarSchemas.js";
import { pqrsSchema } from "../../schemas/informacionSchemas.js";

const pqrsRouter = Router();

pqrsRouter.get("/pqrs", getAllPqrs);
pqrsRouter.get("/pqrs/:id", getPqrs);
pqrsRouter.post("/pqrs", validateSchema(pqrsSchema), postPqrs);
pqrsRouter.put("/pqrs/:id", putPqrs)
pqrsRouter.delete("/pqrs/:id", deletePqrs);
pqrsRouter.delete("/pqrs-delete-all", deleteAllPqrs);

export default pqrsRouter;
