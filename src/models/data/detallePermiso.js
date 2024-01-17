import { DataTypes } from 'sequelize'
import Usuario from './usuario.js'
import Permiso from './permiso.js'
import { sequelize } from '../../conection.js'

const DetallePermiso = sequelize.define('DetallePermiso', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    createdAt:true,
    updatedAt:false
})

// Definir relaciones
Usuario.belongsToMany(Permiso, { through: DetallePermiso, foreignKey: 'UsuarioId' })
Permiso.belongsToMany(Usuario, { through: DetallePermiso, foreignKey: 'PermisoId' })

export default DetallePermiso
