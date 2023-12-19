import { Sequelize } from "sequelize";
import { config } from "dotenv";

config()

// ? conección a la base de datos Postgres

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USER
});


// ? función para verifica la conexión

const connect = async ()=>{
    try {
        await sequelize.authenticate()
        console.log(` Conexión exitosa a la base de datos `);
    } catch (error) {
        console.error('Error de conexión a la base de datos: ', err.message)
        // TODO asignar el throw error
        // throw new Error(`Error de conexión a la base de datos: ${err.message}` )
    }
}

export default connect