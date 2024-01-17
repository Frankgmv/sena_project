import { Sequelize, DataTypes } from 'sequelize'

const Video = Sequelize.define('Videos', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true
    },
    linkVideo:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    },
    tituloVideo:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id'
        }
    }
})

Video.createTable({
    tableName:'Videos'
})

export default Video
