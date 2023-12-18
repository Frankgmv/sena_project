import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
//? Add cors finally

app.get("/", (req, res)=>{
    res.send("hola");
})

export default app;