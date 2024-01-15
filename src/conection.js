import {
    Sequelize
} from 'sequelize'
import {
    config
} from 'dotenv'
import 'colors'
import {
    ErrorConexion
} from './middlewares/fabricaErrores.js'

config()

const {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} = process.env

// ? conección a la base de datos Postgres

Sequelize.DEBUG = true

export const sequelize = new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    dialect: 'postgres',
    password: DB_PASSWORD,
    port: DB_PORT,
    username: DB_USER
})

/*
//* Conexión para la db cuando se despliegue en remoto
 const sequelize = new Sequelize(process.env.DB_STRING_CONNECT_CLOUD, {
     dialect: 'postgres',
     ssl:true,
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,  // Número mínimo de conexiones en el pool
        acquire: 30000,
        idle: 10000
    }
});
*/

// ? función para verifica la conexión

export const connect = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({alter:true});
        await sequelize.sync()
        console.log(`  <<  Conexión exitosa a la base de datos >> `.blue)
    } catch (err) {
        await sequelize.sync({alter:true})
        throw new ErrorConexion(err)
    }
}

connect()
