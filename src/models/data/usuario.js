import {
    DataTypes
} from 'sequelize'
import {
    sequelize
} from '../../conection.js'
import Rol from './rol.js'

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
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
        type: DataTypes.TEXT,
        allowNull: false,
        unique:true
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
},{
    tableName:"Usuarios"
})

Rol.hasMany(Usuario)
Usuario.belongsTo(Rol);



export default Usuario