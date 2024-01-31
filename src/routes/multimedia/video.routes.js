import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteVideo, getAllVideo, getVideo, postVideo, putVideo } from '../../controllers/multimedia/video.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'
const videoRouter = Router()

videoRouter.get('/videos', getAllVideo)
videoRouter.get('/videos/:id', getVideo)
videoRouter.post('/videos', authRutas, validarPermisos('P_VIDEOS'), upload.single('imagen'), postVideo)
videoRouter.put('/videos/:id', authRutas, validarPermisos('P_VIDEOS'), upload.single('imagen'), putVideo)
videoRouter.delete('/videos/:id', authRutas, validarPermisos('P_VIDEOS'), deleteVideo)

export default videoRouter
