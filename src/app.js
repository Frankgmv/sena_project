import express from 'express';
import morgan from 'morgan';
import routesGeneral from './routes/router.js';
import rutas from "./helpers/rutasGuia.json" assert {type : "json" }
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
    res.status(500).json({
        error:true,
        status: 500,
        message: err
    })
})

// ? "Rutas" madres
app.use("/api/v1", routesGeneral);


app.get("/", (req, res) => {
    res.json(rutas);
})

export default app;