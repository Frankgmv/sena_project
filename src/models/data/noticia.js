import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from './usuario.js'

const Noticia = sequelize.define('Noticia', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey:true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    encabezado:{
        type:DataTypes.STRING,
        allowNulls: true
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNulls: true
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false,
        defaultValue:true
    }
}, {
    tableName: 'Noticias',
    createdAt:true,
    updatedAt:false
})

Usuario.hasMany(Noticia, {foreignKey:'UsuarioId'})
Noticia.belongsTo(Usuario, {foreignKey:'UsuarioId'})

export default Noticia
