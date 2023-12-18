import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const User = Sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    apelldio:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    fechaNacimiento:{
        type: DataTypes.DATE,
        allowNull: false,
    }, 
    correo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    celular:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    password:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_rol:{
        type: DataTypes.INTEGER,
        references:{
            model: 'rol',
            key: 'id',
        }
    },
    id_permiso:{
        type: DataTypes.INTEGER,
        references:{
            model: 'detallePermiso',
            key: 'id',
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})