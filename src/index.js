import { config} from "dotenv"
import app from "./app.js";
import "colors";

// ? conectar la base de datos 
import "./conection.js";

config();


// ? Asignar un puerto
const PORT =  process.env.PORT || 6000;

app.listen(PORT, ()=>console.log(`  << aplicacion running on port ${PORT} >>  `.yellow))