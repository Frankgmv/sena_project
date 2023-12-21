import { Sequelize, DataTypes } from 'sequelize'

const Permiso = Sequelize.define('Permiso',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    permiso:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})

Permiso.createTable({
    tableName:"Permisos"
})

export default Permiso