import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'
import Seccion from './seccion.js'
import Categoria from './categoria.js'

const Link = sequelize.define('Link', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
        primaryKey:true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    link:{
        type:DataTypes.TEXT,
        allowNulls: false
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNulls:true
    },
    tipo:{
        type:DataTypes.STRING,
        allowNulls: false
    }
}, {
    tableName:'Links',
    createdAt:true,
    updatedAt:false
})

Usuario.hasMany(Link, {foreignKey:'UsuarioId'})
Seccion.hasMany(Link, {foreignKey:'SeccionId'})
Categoria.hasMany(Link, {foreignKey:'CategoriaId'})

Link.belongsTo(Usuario, {foreignKey:'UsuarioId'})
Link.belongsTo(Seccion, {foreignKey:'SeccionId'})
Link.belongsTo(Categoria,  {foreignKey:'CategoriaId'})

export default Link
