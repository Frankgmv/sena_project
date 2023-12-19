import { Sequelize, DataTypes} from 'sequelize'

const DetallePermiso = Sequelize.define('DetallePermiso',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    idUsuaio:{
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        }
    },
    idPermiso:{
        type: DataTypes.INTEGER,
        references:{
            model: 'permiso',
            key: 'id',
        }
    },
})


export default DetallePermiso
