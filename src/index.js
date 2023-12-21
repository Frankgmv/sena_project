import { config} from "dotenv"
import app from "./app.js";
import "colors";
import connect from "./conection.js";

config();

// ? conectar la base de datos 
connect();

// ? Asignar un puerto
const PORT =  process.env.PORT || 6000;

app.listen(PORT, ()=>console.log(`  << aplicacion running on port ${PORT} >>  `.yellow))