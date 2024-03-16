import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

export const maxBytes = 1E7

export const archiveMaxBytes = 1E7 * 4

export const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg']

export const ArchivosPermitidos = ['application/pdf']

const permisosKeyEstudianteEspecial = [ 'P_MENU', 'P_GALERIA', 'P_MAGAZINE', 'P_ANUNCIOS', 'P_NOTICIAS' ]

const permisosKeyDocente = [ ...permisosKeyEstudianteEspecial, 'P_ANUNCIOS', 'P_NOTIFICACIONES' ]

const permisosKeyPersonalAdministrador = [ 'P_MENU', 'P_SLIDER', 'P_VIDEOS', 'P_ANUNCIOS', 'P_NOTICIAS', 'P_NOTIFICACIONES', 'P_USUARIOS' ]

const permisosKeyCoordinador = [ ...permisosKeyPersonalAdministrador, 'P_GALERIA', 'P_MAGAZINE', 'P_HISTORIAL', 'P_NOTIFICACIONES' ]

const permisosKeyWM = [ 'P_ADMIN', 'P_SLIDER', 'P_HISTORIAL', 'P_ANUNCIOS', 'P_MENU', 'P_GALERIA', 'P_VIDEOS', 'P_MAGAZINE', 'P_PQRS', 'P_NOTICIAS', 'P_LINKS', 'P_NOTIFICACIONES', 'P_CLAVE_ESPECIAL', 'P_USUARIOS' ]

export const variablesPermisos = {
    EST_E: permisosKeyEstudianteEspecial,
    DOC: permisosKeyDocente,
    P_ADM: permisosKeyPersonalAdministrador,
    COOR: permisosKeyCoordinador,
    WM: permisosKeyWM
}

const categorias = [
    { 'categoria':'Preescolar', 'categoriaKey':'C_PREESCOLAR' },
    { 'categoria':'Primaria', 'categoriaKey':'C_PRIMARIA' },
    { 'categoria':'Bachillerato', 'categoriaKey':'C_BACHILLERATO' },
    { 'categoria':'Orientación Escolar', 'categoriaKey':'C_ORIENTACION_ESCOLAR' },
    { 'categoria':'Coordinación', 'categoriaKey':'C_COORDINACION' },
    { 'categoria':'Rectoria', 'categoriaKey':'C_RECTORIA' },
    { 'categoria':'Classroom', 'categoriaKey':'C_CLASSROOM' },
    { 'categoria':'Collage', 'categoriaKey':'C_COLLAGE' },
    { 'categoria':'ARCHIVO_PDF', 'categoriaKey':'ARCHIVO_PDF' }
]

const saltos = bcrypt.genSaltSync(10)
const passwordHast = bcrypt.hashSync(process.env.CLAVE_ESPECIAL, saltos)

const claveEspecial = {
    'token' : passwordHast,
    'nombre' : 'Clave Especial',
    'tokenKey' : 'CL_ESPECIAL',
    'tiempo' : 24,
    'UsuarioId' : process.env.ID_WM
}

const claveCorreoNodemailer = {
    'correo' : process.env.EMAIL_USER,
    'clave' : process.env.EMAIL_PASS,
    'UsuarioId' : process.env.ID_WM
}

const permisos = [{ 'permiso': 'SUPER ADMIN', 'permisoKey': 'P_ADMIN' },
{ 'permiso': 'Slider de fotos', 'permisoKey': 'P_SLIDER' },
{ 'permiso': 'Anuncios', 'permisoKey': 'P_ANUNCIOS' },
{ 'permiso': 'Menú Innovación Educativa', 'permisoKey': 'P_MENU' },
{ 'permiso': 'Galeria y Eventos', 'permisoKey': 'P_GALERIA' },
{ 'permiso': 'Videos', 'permisoKey': 'P_VIDEOS' },
{ 'permiso': 'Magazine - Periodico Escolar', 'permisoKey': 'P_MAGAZINE' },
{ 'permiso': 'Noticias', 'permisoKey': 'P_NOTICIAS' },
{ 'permiso': 'Link de Archivos PDFs y Plataformas acádemicas', 'permisoKey': 'P_LINKS' },
{ 'permiso': 'Historial', 'permisoKey': 'P_HISTORIAL' },
{ 'permiso': 'PQRS', 'permisoKey': 'P_PQRS' },
{ 'permiso': 'Recibir Notificaciones', 'permisoKey': 'P_NOTIFICACIONES' },
{ 'permiso': 'Actualizar Clave Especial de registro', 'permisoKey': 'P_CLAVE_ESPECIAL' },
{ 'permiso': 'Editar informacion de usuarios', 'permisoKey': 'P_USUARIOS' }
]

const roles = [
    { 'rol':'Estudiante Especial', 'rolKey':'EST_E' },
    { 'rol':'Docente', 'rolKey':'DOC' },
    { 'rol':'Personal Administrativo', 'rolKey':'P_ADM' },
    { 'rol':'Coordinador', 'rolKey':'COOR' },
    { 'rol':'Web Master', 'rolKey':'WM' }
]

const secciones = [
    { 'seccion':'Rectoria', 'seccionKey':'S_RECTORIA' },
    { 'seccion':'Consejo Directivo', 'seccionKey':'S_CON_DIRECTIVO' },
    { 'seccion':'Consejo Acádemico', 'seccionKey':'S_CON_ACADEMICO' },
    { 'seccion':'Consejo Estudiantil', 'seccionKey':'S_CON_ESTUDIANTIL' },
    { 'seccion':'Consejo de Padres', 'seccionKey':'S_CON_PADRES' },
    { 'seccion':'Consejo Profesores', 'seccionKey':'S_CON_PROFESORES' },
    { 'seccion':'Personería', 'seccionKey':'S_PERSONERIA' },
    { 'seccion':'Contraloria', 'seccionKey':'S_CONTRALORIA' },
    { 'seccion':'Emisora', 'seccionKey':'S_EMISORA' },
    { 'seccion':'Banda Musical', 'seccionKey':'S_BANDA_MUSICAL' },
    { 'seccion':'Equipo Deportivo', 'seccionKey':'S_EQUIPO_DEPORTIVO' },
    { 'seccion':'Esenarios Culturales', 'seccionKey':'S_ESENARIO_CULTURAL' },
    { 'seccion':'Estudiantes', 'seccionKey':'S_ESTUDIANTES' },
    { 'seccion':'Gobierno Escolar', 'seccionKey':'S_GOB_ESCOLAR' },
    { 'seccion':'Plataformas Acádemicas', 'seccionKey':'S_PLAT_ACADEMICAS' },
    { 'seccion':'Archivos PDF', 'seccionKey':'ARCHIVO_PDF' }
]

const passwordUsuario = bcrypt.hashSync(process.env.PASSWORD_WM, saltos)
const usuario = {
    'id': process.env.ID_WM,
    'nombre': 'WEB MASTER',
    'apellido': 'RECTOR',
    'celular': '0000000000',
    'correo': 'no-escribir@gmail.com',
    'fechaNacimiento': '2020-06-09',
    'estado': true,
    'password': passwordUsuario,
    'RolId': 5
}

export const defaultVariables = {
    categorias,
    claveEspecial,
    permisos,
    roles,
    secciones,
    usuario,
    claveCorreoNodemailer
}
