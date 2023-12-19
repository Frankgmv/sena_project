import { Sequelize, DataTypes } from 'sequelize'

const Noticia = Sequelize.define('Noticia',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    },
    encabezado:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    descipcion:{
        type:DataTypes.STRING,
        allowNulls: false
    },
    encabezado:{
        type:DataTypes.BLOB,
        allowNulls: false
    },
    idUser:{
        type:DataTypes.INTEGER,
        allowNulls: false,
        references: {
            model:'User',
            key: 'id',
        }
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})

export default Noticia