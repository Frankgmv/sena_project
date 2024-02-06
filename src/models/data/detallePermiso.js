import { config } from 'dotenv'
import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import { postDetallePermisoDefault } from '../../helpers/permisos.default.js'
import { DetalleError } from '../../middlewares/fabricaErrores.js'
import Permiso from './permiso.js'
import Usuario from './usuario.js'

config()

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
Usuario.belongsToMany(Permiso, { through: DetallePermiso, foreignKey: 'UsuarioId', as : 'permisos' })
Permiso.belongsToMany(Usuario, { through: DetallePermiso, foreignKey: 'PermisoId',  as :'permisoEntity' })

setTimeout(async () => {
    try {
        const hay = await DetallePermiso.findAll()
        if (hay.length === 0) {
            const permisos = await postDetallePermisoDefault({id: process.env.ID_WM, RolId: 5})
            if (!permisos.ok) {
                throw new DetalleError(permisos.message)
            }
        }
    } catch (error) {
        throw new DetalleError(error)
    }
}, 5000)

export default DetallePermiso
