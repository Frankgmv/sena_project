import { DataTypes } from 'sequelize';
import { sequelize } from '../../conection.js';
import { ErrorSeccion } from '../../middlewares/fabricaErrores.js';

// Data json de los secciones por defecto
import seccionesPorDefecto from "../../helpers/sessiones.json" assert { type: "json" };

const Seccion = sequelize.define('Secciones',{
    seccion:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    seccionKey:{
        type: DataTypes.STRING,
        allowNulls: false,
        unique: true
    },
},{
    timestamps:false
})  

// funcion para insertar los datos de los Secciones por defecto.
async function insertDefaultData(secciones) {
    await Seccion.sync();
    const haySecciones = await Seccion.findAll();
    if (haySecciones.length === 0) {
        try {
            for (let seccion of secciones) {
                await Seccion.create(seccion);
            }
        } catch (error) {
            throw new ErrorSeccion(error.message)
        }
    }
}

insertDefaultData(seccionesPorDefecto.secciones);

export default Seccion