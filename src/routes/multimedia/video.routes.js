import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteVideo, getAllVideo, getVideo, postVideo, putVideo } from '../../controllers/multimedia/video.controller.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
const videoRouter = Router()

videoRouter.get('/videos', getAllVideo)
videoRouter.get('/videos/:id', getVideo)
videoRouter.post('/videos', authRutas, upload.single('imagen'), postVideo)
videoRouter.put('/videos/:id', authRutas, upload.single('imagen'), putVideo)
videoRouter.delete('/videos/:id', authRutas, deleteVideo)

export default videoRouter
