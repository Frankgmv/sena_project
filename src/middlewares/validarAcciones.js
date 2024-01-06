import permisosPorDefecto from "../helpers/permisos.json" assert { type: "json" };
import Permiso from "../models/data/permiso.js";

export const validarPermisos = async (req, res, next) =>{

    const { id } = req.params;

    try {
        const permisoConsultado = await Permiso.findByPk(id);

        if(permisoConsultado){

            const esta = permisosPorDefecto.permisos.some(permiso => permiso.permisoKey === permisoConsultado.permisoKey);
            if(esta) {
                return res.status(400).json({
                ok:false,
                status:400,
                message: "Permiso por defecto inmutable"
            })} else{
                next();
            }
        }else{
            next()
        }

    } catch (error) {
        res.status(500).json({
            ok:false,
            status:500,
            errorServer: "Error al validar acción",
            message: error.message
        })
    }



}

// Validar formato de fehca
export const validarFormatoFecha = (value) => {
    // Expresión regular para validar el formato YYYY/MM/DD
    const formatoFecha = /^\d{4}\/\d{2}\/\d{2}$/;
    return formatoFecha.test(value);
};