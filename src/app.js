import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rutas from './helpers/rutasGuia.js'

import manejadorErrores from './middlewares/manejadorErrores.js'
import routesGeneral from './routes/router.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(morgan('dev'))
app.use(cookieParser())
// TODO cors
// ? Add cors finally app.use(cors({options}))

// Reclamar recursos a la API
app.use('/api/v1/recursos', express.static('./src/upload'))

app.use('/api/v1', routesGeneral)

app.get('/', (req, res) => {
    res.json(rutas)
})

// TODO verificar que los errores se recogan bien cuando viene de zod y otras partes más ya que traen mucha más estructura
app.use(manejadorErrores)

export default app
