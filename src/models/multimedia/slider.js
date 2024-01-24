import { DataTypes } from 'sequelize'
import { sequelize } from '../../conection.js'
import Galeria from './galeria.js'

const Slider = sequelize.define('Slider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNulls: false,
        autoIncrement: true
    }
}, {
    freezeTableName: true,
    createdAt:true,
    updatedAt:false
})

Galeria.hasMany(Slider, {foreignKey: 'ImagenId', as: 'imagenes'})
Slider.belongsTo(Galeria, {foreignKey: 'ImagenId', as: 'imagenes'})

export default Slider
