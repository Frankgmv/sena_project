import { Router } from 'express'
import { deleteLink, getAllLink, getLink, postLink, putLink } from '../../controllers/data/link.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { linkSchema, putLinkSchema } from '../../schemas/dataSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'

const linkRouter = Router()

linkRouter.get('/links',  getAllLink)
linkRouter.get('/links/:id',  getLink)
linkRouter.post('/links', authRutas,  validateSchema(linkSchema), postLink)
linkRouter.put('/links/:id', authRutas,  validateSchema(putLinkSchema), putLink)
linkRouter.delete('/links/:id', authRutas,  deleteLink)

export default linkRouter
