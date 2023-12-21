import {
    Sequelize
} from "sequelize";
import {
    config
} from "dotenv";

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

// * Conexión para la db cuando se despliegue en remoto
// const sequelize = new Sequelize(process.env.DB_STRING_CONNECT_CLOUD, {
//     dialect: 'postgres',
//     ssl:true
// });

// ? función para verifica la conexión

const connect = async () => {
    try {
        await sequelize.authenticate()
        console.log(` Conexión exitosa a la base de datos `);
    } catch (err) {
        console.error('Error de db: ', err.message)
        // TODO asignar el throw error
        // throw new Error(`Error de conexión a la base de datos: ${err.message}` )
    }
}

export default connect