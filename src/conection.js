import { Sequelize } from "sequelize";
import { config } from "dotenv";

config()


// ? conección a la base de datos con el servior de render

const sequelize = new Sequelize({
    hosts: "postgres://frankadm:pMsEia75inGPOLDRUuQPO4r2sqm2rGkP@dpg-cldltheg1b2c73f97e30-a.oregon-postgres.render.com/pereiraprojectdb" ,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USER
});


// ? Verifica la conexión

sequelize.authenticate()
    .then(() => console.log(` Conexión exitosa a la base de datos `))
        .catch(err =>{
            console.error('Error de conexión a la base de datos: ', err.message)
            // throw new Error(`Error de conexión a la base de datos: ${err.message}` )
        });

export default sequelize