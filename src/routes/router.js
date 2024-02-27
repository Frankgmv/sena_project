import { Router } from 'express'

// Rutas de informacion
import historialRouter from './informacion/historial.routes.js'
import notificacionRouter from './informacion/notificacion.routes.js'
import pqrsRouter from './informacion/pqrs.routes.js'
import vistasRouter from './informacion/vistas.routes.js'

// Rutas de multimedia
import archivoRouter from './multimedia/archivo.routes.js'
import galeriaRouter from './multimedia/galeria.routes.js'
import sliderRouter from './multimedia/slider.routes.js'
import videoRouter from './multimedia/video.routes.js'

// Rutas de data
import anuncioRouter from './data/anuncio.routes.js'
import categoriaRouter from './data/categoria.routes.js'
import itemRouter from './data/item.routes.js'
import linkRouter from './data/link.routes.js'
import noticiaRouter from './data/noticia.routes.js'
import permisoRouter from './data/permiso.routes.js'
import rolRouter from './data/rol.routes.js'
import seccionRouter from './data/seccion.routes.js'
import tokenRouter from './data/token.routes.js'
import usuarioRouter from './data/usuario.routes.js'
import detallePermisoRouter from './data/detallePermiso.routes.js'
import eventoRouter from './data/evento.routes.js'
import credencialesEmail from './data/crendencialEmail.routes.js'

// Rutas de validacion
import credencialesRouter from './validacion/credenciales.routes.js'

// TODO eliminar borrar DB
import { deleteTables } from '../controllers/test.js'
import recuperacionRouter from './validacion/recuperacion.routes.js'

const router = Router()

// Une todas las rutas de la carpeta multimedia
router.use('/multimedia', archivoRouter,
    galeriaRouter,
    sliderRouter,
    videoRouter,
)

// Une todas las rutas de la carpeta data
router.use('/data',
    permisoRouter,
    seccionRouter,
    categoriaRouter,
    rolRouter,
    usuarioRouter,
    detallePermisoRouter,
    noticiaRouter,
    linkRouter,
    eventoRouter,
    itemRouter,
    anuncioRouter,
    tokenRouter,
    credencialesEmail
)

// Une todas las rutas de la carpeta informacion
router.use('/informacion',
    pqrsRouter,
    notificacionRouter,
    vistasRouter,
    historialRouter
)

// Une todas las rutas de la carpeta validacion
router.use('/validacion', credencialesRouter)

// Recuperacion de contraseña
router.use('/recuperacion', recuperacionRouter)

// TODO eliminar ruta al terminar
router.post('/reset-database', deleteTables)

export default router
