import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import Rol from './rol.js'

const Usuario = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    correo: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

// Rol.hasMany(Usuario, {
//     foreignKey: "id_rol"
// })
// Usuario.belongsTo(Rol);



export default Usuario