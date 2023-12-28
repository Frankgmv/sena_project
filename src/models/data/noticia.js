import { Sequelize, DataTypes } from 'sequelize'

const Noticia = Sequelize.define('Noticias',{
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
    imgPath:{
        type:DataTypes.STRING,
        allowNulls: true
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
            model:'Usuario',
            key: 'id',
        }
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})

Noticia.createTable({
    tableName:"Noticias"
})

export default Noticia