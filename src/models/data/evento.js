import { Sequelize, DataTypes } from 'sequelize'


const Evento = Sequelize.define('Eventos',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    evento:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNulls: false,
    },
})  

export default Evento