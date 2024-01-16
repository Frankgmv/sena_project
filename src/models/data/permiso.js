import {
    DataTypes
} from "sequelize"
import {
    sequelize
} from "../../conection.js"

// fabrica de error personalizado 
import {
    ErrorPermiso
} from "../../middlewares/fabricaErrores.js";

// Datos de los permisos
import permisosPorDefecto from "./../../helpers/permisos.json" assert { type: "json"};

const Permiso = sequelize.define("Permiso", {
    permiso: {
        type: DataTypes.STRING,
        allowNulls: false,
    },
    permisoKey: {
        type: DataTypes.STRING,
        allowNulls: false,
    }
}, {
    // tableName:"Permisos",
    createdAt:true,
    updatedAt:false
})

// funcion para insertar los datos de los permisos por defecto.
async function insertDefaultData(dataPermisos) {
    try {
        await Permiso.sync();
        const hayPermisos = await Permiso.findAll();
        if (hayPermisos.length === 0) {
            await Permiso.bulkCreate(dataPermisos);
        }
    } catch (error) {
        throw new ErrorPermiso(error)
    }
}

// insertDefaultData(permisosPorDefecto.permisos);

export default Permiso