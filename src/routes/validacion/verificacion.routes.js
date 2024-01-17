import { Router } from 'express'
import { test } from '../../controllers/test.js'

const verificacionRouter = Router()

verificacionRouter.get('/verificacion', test)

export default verificacionRouter
