import {
    Sequelize,
    DataTypes
} from 'sequelize'

const Galeria = Sequelize.define('Galeria', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNulls: false
    },
    nombreEvento: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    imgPath: {
        type: DataTypes.STRING,
        allowNulls: false
    },
    idUsuaio: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    idEvento: {
        type: DataTypes.INTEGER,
        references: {
            model: 'evento',
            key: 'id'
        }
    }
})

export default Galeria
