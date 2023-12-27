import { Sequelize, DataTypes } from 'sequelize'

const Usuario = Sequelize.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    }, 
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    apellidio:{
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

Usuario.createTable({
    tableName:"Usuarios"
})

export default Usuario