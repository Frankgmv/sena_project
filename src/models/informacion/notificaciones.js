import { Sequelize, DataTypes } from 'sequelize'

const Notificacion = Sequelize.define('Notificacion',{
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
        allowNulls: false
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false
    },
    estado:{
        type:DataTypes.BOOLEAN,
        allowNulls: false
    }
})

Notificacion.createTable({
    tableName:"Notificaciones"
})

export default Notificacion