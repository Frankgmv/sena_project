import { Sequalize, DataTypes } from 'sequelize'
import sequelize from '../conection'

const Slider = Sequelize.define('Slider   ',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    idFoto:{
        type:DataTypes.DATE,
        allowNulls: false,
        references:{
            model: 'galeria',
            key: 'id',
        }
    },
})  