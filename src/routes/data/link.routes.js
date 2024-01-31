import { Router } from 'express'
import { deleteLink, getAllLink, getLink, postLink, putLink } from '../../controllers/data/link.controller.js'
import { validateSchema } from '../../middlewares/validarSchemas.js'
import { linkSchema, putLinkSchema } from '../../schemas/dataSchemas.js'
import { authRutas } from '../../middlewares/tokenValidator.js'
import { validarPermisos } from '../../middlewares/validarPermisos.js'

const linkRouter = Router()

linkRouter.get('/links',  getAllLink)
linkRouter.get('/links/:id',  getLink)
linkRouter.post('/links', authRutas, validarPermisos('P_LINKS'),  validateSchema(linkSchema), postLink)
linkRouter.put('/links/:id', authRutas, validarPermisos('P_LINKS'),  validateSchema(putLinkSchema), putLink)
linkRouter.delete('/links/:id', authRutas, validarPermisos('P_LINKS'),  deleteLink)

export default linkRouter
