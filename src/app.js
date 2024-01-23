import express from 'express'
import morgan from 'morgan'
import rutas from './helpers/rutasGuia.json' assert { type: "json" }

import manejadorErrores from './middlewares/manejadorErrores.js'
import routesGeneral from './routes/router.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(morgan('dev'))
// TODO cors
// ? Add cors finally app.use(cors({options}))

// ? "Rutas" madres

// Reclamar imagenes a la API
app.use('/images',express.static('./src/upload'))

app.use('/api/v1', routesGeneral)

app.get('/', (_req, res) => {
    res.json(rutas)
})

// TODO verificar que los errores se recogan bien cuando viene de zod y otras partes más ya que traen mucha más estructura
app.use(manejadorErrores)

export default app
