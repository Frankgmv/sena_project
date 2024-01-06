import {
    Router
} from "express"
import validateSchema from "../../middlewares/validarSchemas.js";
import {
    detallePermisoSchema
} from "../../schemas/dataSchemas.js";
import { deleteDetallePermisos, getDetallePermisosByDocumento, postDetallePermiso, 
} from "../../controllers/data/detallePermiso.controller.js";

const detallePermisoRouter = Router();

detallePermisoRouter.get("/detalle-permisos/:idUsuario", getDetallePermisosByDocumento);
detallePermisoRouter.post("/detalle-permisos", validateSchema(detallePermisoSchema), postDetallePermiso);
detallePermisoRouter.delete("/detalle-permisos/:idDetallePermiso", deleteDetallePermisos);

export default detallePermisoRouter;