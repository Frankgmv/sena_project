import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from '../data/usuario.js'

const Historial = sequelize.define('Historial', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey:true,
        autoIncrement: true
    },
    cambio:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNulls: false
    }
}, {
    freezeTableName:true,
    createdAt:true,
    updatedAt:false
})

Usuario.hasMany(Historial, {foreignKey:'UsuarioId'})
Historial.belongsTo(Usuario)

export default Historial
