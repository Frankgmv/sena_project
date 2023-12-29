import {
    Sequelize
} from "sequelize";
import {
    config
} from "dotenv";
import "colors";
import {
    ErrorConexion
} from "./middlewares/fabricaErrores.js";

config()


// ? conección a la base de datos Postgres

export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USER
});

// * Conexión para la db cuando se despliegue en remoto
// const sequelize = new Sequelize(process.env.DB_STRING_CONNECT_CLOUD, {
//     dialect: 'postgres',
//     ssl:true
// });

// ? función para verifica la conexión

export const connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({
            alter: true
        })
        console.log(`  <<  Conexión exitosa a la base de datos >> `.blue);
    } catch (err) {
        throw new ErrorConexion("Error de conexión");
    }
}

connect();