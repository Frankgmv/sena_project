import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js';
import "colors";
import rolesPorDefecto from "../../helpers/roles.json" assert {type: "json" };

import {
    ErrorRol
} from '../../middlewares/fabricaErrores.js';

const Rol = sequelize.define('Rol', {
    rol: {
        type: DataTypes.STRING,
        allowNulls: false,
        primaryKey:true,
        autoIncrement:false
    },
    rolKey: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNulls: false
    }
}, {
    tableName: "Roles",
    timestamps: false
})


function insertDefaultData(dataRoles) {
    return new Promise(async () => {
        try {
            await Rol.sync();
            const hayRoles = await Rol.findAll();

            if (hayRoles.length == 0) {
                for (let rol of dataRoles) {
                    console.log(`${JSON.stringify(rol)}`.blue);
                    await Rol.create(rol)
                }
            }
        } catch (error) {
            throw new ErrorRol(error);
        }
    });
}

const callData = async () => {
    try {
        await insertDefaultData(rolesPorDefecto.roles);
    } catch (error) {
        throw new ErrorRol(error);
    }
}

// callData();

export default Rol