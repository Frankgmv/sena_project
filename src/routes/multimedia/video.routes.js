import { Router } from 'express'
import { upload } from '../../helpers/includes.js'
import { deleteVideo, getAllVideo, getVideo, postVideo, putVideo } from '../../controllers/multimedia/video.controller.js'
const videoRouter = Router()

videoRouter.get('/videos', getAllVideo)
videoRouter.get('/videos/:id', getVideo)
videoRouter.post('/videos', upload.single('imagen'), postVideo)
videoRouter.put('/videos/:id', upload.single('imagen'), putVideo)
videoRouter.delete('/videos/:id', deleteVideo)

export default videoRouter
