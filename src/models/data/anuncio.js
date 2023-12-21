import { Sequelize, DataTypes } from 'sequelize'

const Anuncio = Sequelize.define('Anuncio',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNulls: false,
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNulls: true
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
    idSeccion:{
        type: DataTypes.INTEGER,
        references:{
            model: 'seccion',
            key: 'id',
        }
    },
})  

export default Anuncio