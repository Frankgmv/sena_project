import 'colors'
import { config } from 'dotenv'
import { Sequelize } from 'sequelize'
import { ErrorConexion } from './middlewares/fabricaErrores.js'

config()

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT, ENV } = process.env

export const sequelize = (ENV === 'produccion') ? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    dialect: 'postgres',
    ssl: true,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}) : new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    dialect: 'postgres',
    password: DB_PASSWORD,
    port: DB_PORT,
    username: DB_USER,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.DEBUG = true

// ? función para verifica la conexión
export const connect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({
            alter: true
        })
        console.log(`  <<  Conexión exitosa a la base de datos >> `.blue)
    } catch (err) {
        throw new ErrorConexion(err)
    }
}

connect()
