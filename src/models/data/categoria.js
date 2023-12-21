import { Sequelize, DataTypes } from 'sequelize'

const Categoria = Sequelize.define('Categoria',{
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        autoIncrement: true,
    },
    categoria:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
})  

Categoria.createTable({
    tableName:"Categorias"
})

export default Categoria