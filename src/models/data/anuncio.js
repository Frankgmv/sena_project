import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'
import Seccion from './seccion.js'

const Anuncio = sequelize.define('Anuncio', {
    id:{
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey:true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: true
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNulls: true
    },
    imgPath:{
        type:DataTypes.TEXT,
        allowNulls: true
    }
}, {
    tableName:'Anuncios',
    createdAt:true,
    updatedAt:false
})

Usuario.hasMany(Anuncio, {foreignKey:'UsuarioId'})
Seccion.hasMany(Anuncio, {foreignKey:'SeccionId'})

Anuncio.belongsTo(Usuario, {foreignKey:'UsuarioId'})
Anuncio.belongsTo(Seccion, {foreignKey:'SeccionId'})

export default Anuncio
