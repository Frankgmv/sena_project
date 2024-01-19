import Anuncio from '../models/data/anuncio.js'
import Categoria from '../models/data/categoria.js'
import DetallePermiso from '../models/data/detallePermiso.js'
import Evento from '../models/data/evento.js'
import Link from '../models/data/link.js'
import Noticia from '../models/data/noticia.js'
import Permiso from '../models/data/permiso.js'
import Rol from '../models/data/rol.js'
import Seccion from '../models/data/seccion.js'
import Token from '../models/data/token.js'
import Usuario from '../models/data/usuario.js'
import Historial from '../models/informacion/historial.js'
import Notificacion from '../models/informacion/notificaciones.js'
import Pqrs from '../models/informacion/pqrs.js'
import Vistas from '../models/informacion/vistas.js'

export const test = (req, res) => {
    res.send('Ruta funcionando')
}

export const deleteTables = async (req, res, next) => {
    try {
        await Evento.drop()
        await Token.drop()
        await Historial.drop()
        await Anuncio.drop()
        await Link.drop()
        await Noticia.drop()
        await DetallePermiso.drop()
        await Usuario.drop()
        await Rol.drop()
        await Categoria.drop()
        await Seccion.drop()
        await Permiso.drop()
        await Vistas.drop()
        await Notificacion.drop()
        await Pqrs.drop()

        res.status(200).json({message:'Tablas borradas exitosamente...'})
    } catch (error) {
        next(error.message)
    }
}
