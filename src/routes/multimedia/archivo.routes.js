import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteArchivo, getArchivo, postArchivo } from '../../controllers/multimedia/archivo.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const archivoRouter = Router()

archivoRouter.get('/archivos', getArchivo)
archivoRouter.post('/archivos', authRutas, validarPermisos('P_MAGAZINE'), upload.single('archivo'), postArchivo)
archivoRouter.delete('/archivos', authRutas, validarPermisos('P_MAGAZINE'), deleteArchivo)

export default archivoRouter
