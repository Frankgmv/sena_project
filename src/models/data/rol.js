import {
    DataTypes
} from 'sequelize'

import {
    sequelize
} from '../../conection.js';

import dataRol from "../../helpers/roles.json" assert {type : "json"};
import { ErrorRol } from '../../middlewares/fabricaErrores.js';

const Rol = sequelize.define('Roles', {
    rol: {
        type: DataTypes.STRING,
        allowNulls: false,
    },
    rolKey: {
        type: DataTypes.STRING,
        allowNulls: false,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue: true
    }
})

async function insertDefaultData(Roles) {
    await Rol.sync({
        tableName: "Roles"
    });
    const hayRoles = await Rol.findAll();
    if (hayRoles.length === 0) {
        try {
            for (let rol of Roles) {
                await Rol.create(rol);
            }
        } catch (error) {
            throw new ErrorRol(error.message)
        }
    }
}
 
insertDefaultData(dataRol.roles);

export default Rol