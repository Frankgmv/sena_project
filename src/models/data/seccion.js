import { Sequelize, DataTypes } from 'sequelize'

const Seccion = Sequelize.define('Seccion',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    seccion:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})  

export default Seccion