import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rutas from './helpers/rutasGuia.js'
import cors from 'cors'
import manejadorErrores from './middlewares/manejadorErrores.js'
import routesGeneral from './routes/router.js'
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['authorization', 'Content-Type', 'credential-reset']
}))

// Reclamar recursos a la API
app.use('/api/v1/recursos', express.static('./src/upload'))

app.use('/api/v1', routesGeneral)

app.get('/', (req, res) => {
    res.json(rutas)
})

app.use(manejadorErrores)

export default app
