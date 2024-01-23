import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from '../data/usuario.js'

const Video = sequelize.define('Videos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNulls: false,
        autoIncrement: true
    },
    link:{
        type: DataTypes.TEXT,
        allowNulls: false
    },
    titulo:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    imgPath:{
        type:DataTypes.TEXT,
        allowNulls: true
    }
}, {
    freezeTableName:true,
    createdAt:true,
    updatedAt:false
})

Usuario.hasMany(Video, {foreignKey:'UsuarioId', as: 'videos'})
Video.belongsTo(Usuario)

export default Video
