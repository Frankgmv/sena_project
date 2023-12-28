import { DataTypes } from 'sequelize';
import { sequelize } from '../../conection.js';
import categoriasPorDefecto from '../../helpers/categorias.json' assert { type: "json" };
import { ErrorCategoria } from '../../middlewares/fabricaErrores.js';

const Categoria = sequelize.define('Categorias',{
    categoria:{
        type: DataTypes.STRING,
        allowNulls: false,
    },
    categoriaKey:{
        type: DataTypes.STRING,
        allowNulls: false,
        unique:true
    },
})  

// funcion para insertar los datos de los categorias por defecto.
async function insertDefaultData(categorias) {
    await Categoria.sync();

    const haycategorias = await Categoria.findAll();
    if (haycategorias.length === 0) {
        try {
            for (let categoria of categorias) {
                await Categoria.create(categoria);
            }
        } catch (error) {
            throw new ErrorCategoria(error.message)
        }
    }
}

insertDefaultData(categoriasPorDefecto.categorias);

export default Categoria