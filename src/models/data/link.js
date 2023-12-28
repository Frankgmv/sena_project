import { Sequelize, DataTypes } from 'sequelize'

const Link = Sequelize.define('Links',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    titulo:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    link:{
        type:DataTypes.STRING,
        allowNulls: false,
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
    idCategoria:{
        type: DataTypes.INTEGER,
        references:{
            model: 'categoria',
            key: 'id',
        }
    },
    descripcion:{
        type: DataTypes.STRING,
        defaultValue:true
    }
})  
Link.createTable({
    tableName:"Links"
})

export default Link