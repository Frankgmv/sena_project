import { Sequelize, DataTypes } from 'sequelize'

const Video = Sequelize.define('Video',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    linkVideo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
    tituloVideo:{
        type:DataTypes.STRING,
        allowNulls: false,
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'evento',
            key: 'id',
        }
    },
})  

Video.createTable({
    tableName:"Videos"
})

export default Video