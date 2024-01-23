import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Usuario from '../data/usuario.js'

const Archivo = sequelize.define('Archivo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNulls: false,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    archivo:{
        type: DataTypes.TEXT,
        allowNulls: false
    }
}, {
    tableName:'Archivos',
    createdAt: true,
    updatedAt: false
})

Usuario.hasMany(Archivo, {foreignKey:'UsuarioId', as: 'archivos'})
Archivo.belongsTo(Usuario)

export default Archivo
