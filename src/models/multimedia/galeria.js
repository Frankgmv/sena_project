import { DataTypes } from 'sequelize'
import Usuario from '../data/usuario.js'
import Evento from '../data/evento.js'
import { sequelize } from '../../conection.js'

const Galeria = sequelize.define('Galeria', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey:true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    imgPath: {
        type: DataTypes.STRING,
        allowNulls: false
    }
}, {
    updatedAt: false,
    createdAt: true,
    freezeTableName: true
})

Usuario.hasMany(Galeria, {foreignKey: 'UsuarioId'})
Galeria.belongsTo(Usuario)

Evento.hasMany(Galeria, {foreignKey: 'EventoId'})
Galeria.belongsTo(Evento)

export default Galeria
