import { Sequelize, DataTypes } from 'sequelize'

const Slider = Sequelize.define('Slider   ', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true
    },
    idFoto:{
        type:DataTypes.DATE,
        allowNulls: false,
        references:{
            model: 'galeria',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
})

export default Slider
