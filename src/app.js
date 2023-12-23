import express from 'express';
import morgan from 'morgan';
import routesGeneral from './routes/general/router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan("dev"));
// TODO cors
//? Add cors finally app.use(cors({options}))

// TODO verificar que los errores se recogan bien cuando viene de zod y otras partes más ya que traen mucha más estructura
app.use((err, req, res, next) => {
    res.status(400).json({
        message: err
    })
    next()
})


// ! Rutas madres
app.use("/api/v1", routesGeneral);


app.get("/", (req, res) => {
    res.send("hola");
})

export default app;