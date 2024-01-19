import { Sequelize, DataTypes } from 'sequelize'

const Archivo = Sequelize.define('Archivos', {
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false
    },
    archivo:{
        type:DataTypes.BLOB,
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
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

Archivo.createTable({
    tableName:'Archivos'
})

export default Archivo
