import {
    Router
} from 'express';

// * Rutas de informacion

import historialRouter from './informacion/historial.routes.js';
import notificacionRouter from './informacion/notificacion.routes.js';
import pqrsRouter from './informacion/pqrs.routes.js';
import vistasRouter from './informacion/vistas.routes.js';

// * Rutas de multimedia

import archivoRouter from './multimedia/archivo.routes.js';
import galeriaRouter from './multimedia/galeria.routes.js';
import sliderRouter from './multimedia/slider.routes.js';
import videoRouter from './multimedia/video.routes.js';

// * Rutas de data

import anuncioRouter from './data/anuncio.routes.js';
import categoriaRouter from './data/categoria.routes.js';
import itemRouter from './data/item.routes.js';
import linkRouter from './data/link.routes.js';
import noticiaRouter from './data/noticia.routes.js';
import permisoRouter from './data/permiso.routes.js';
import rolRouter from './data/rol.routes.js';
import seccionRouter from './data/seccion.routes.js';
import tokenRouter from './data/token.routes.js';
import usuarioRouter from './data/usuario.routes.js';
import detallePermisoRouter from './data/detallePermiso.routes.js';

// * Rutas de validacion

import loginRouter from './validacion/login.routes.js';
import logoutRouter from './validacion/logout.routes.js';
import registroRouter from './validacion/registro.routes.js';
import verificacionRouter from './validacion/verificacion.routes.js';

// Enrutador general de todo
const router = Router();

// Une todas las rutas de la carpeta multimedia
router.use("/multimedia", archivoRouter,
    galeriaRouter,
    sliderRouter,
    videoRouter,
);

// Une todas las rutas de la carpeta data
router.use("/data",
    permisoRouter,
    seccionRouter,
    categoriaRouter,
    rolRouter,
    usuarioRouter,
    detallePermisoRouter,
    noticiaRouter,
    linkRouter,
    itemRouter,
    anuncioRouter,
    tokenRouter,
);


// Une todas las rutas de la carpeta informacion
router.use("/informacion",
    pqrsRouter,
    notificacionRouter,
    vistasRouter,
    historialRouter
);

// Une todas las rutas de la carpeta validacion
router.use("/validacion", loginRouter,
    registroRouter,
    logoutRouter,
    verificacionRouter
);

export default router;