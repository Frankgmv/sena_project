import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

export const maxBytes = 1E7

export const archiveMaxBytes = 1E7 * 4

export const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg']

export const ArchivosPermitidos = ['application/pdf']

const permisosKeyEstudianteEspecial = [ 'P_MENU', 'P_GALERIA', 'P_GOBIERNO', 'P_ESTUDIANTES', 'P_MAGAZINE', 'P_NOTICIAS' ]

const permisosKeyDocente = [ ...permisosKeyEstudianteEspecial, 'P_BLOGS', 'P_ANUNCIOS', 'P_PLATFORMAS_ACADEMICAS', 'P_NOTIFICACIONES' ]

const permisosKeyPersonalAdministrador = [ 'P_MENU', 'P_SLIDER', 'P_VIDEOS', 'P_ANUNCIOS', 'P_GOBIERNO', 'P_ESTUDIANTES', 'P_NOTICIAS', 'P_NOTIFICACIONES', 'P_USUARIOS' ]

const permisosKeyCoordinador = [ ...permisosKeyPersonalAdministrador, 'P_GALERIA', 'P_BLOGS', 'P_MAGAZINE', 'P_HISTORIAL', 'P_PLATFORMAS_ACADEMICAS', 'P_NOTIFICACIONES' ]

const permisosKeyWM = [ 'P_ADMIN', 'P_SLIDER', 'P_HISTORIAL', 'P_ANUNCIOS', 'P_MENU', 'P_GALERIA', 'P_VIDEOS', 'P_MAGAZINE', 'P_PQRS', 'P_BLOGS', 'P_GOBIERNO', 'P_ESTUDIANTES', 'P_PLATFORMAS_ACADEMICAS', 'P_NOTICIAS', 'P_LINKS', 'P_NOTIFICACIONES', 'P_CLAVE_ESPECIAL', 'P_USUARIOS' ]

export const variablesPermisos = {
    EST_E: permisosKeyEstudianteEspecial,
    DOC: permisosKeyDocente,
    P_ADM: permisosKeyPersonalAdministrador,
    COOR: permisosKeyCoordinador,
    WM: permisosKeyWM
}

const categorias = [
    {
        'categoria':'Categoria Prueba',
        'categoriaKey':'C_PRUEBA'
    },
    {
        'categoria':'Categoria Prueba 2',
        'categoriaKey':'C_PRUEBA2'
    }
]

const saltos = bcrypt.genSaltSync(10)
const passwordHast = bcrypt.hashSync(process.env.CLAVE_ESPECIAL, saltos)

const claveEspecial = {
    'token' : passwordHast,
    'nombre' : 'Clave Especial',
    'tokenKey' : 'CL_ESPECIAL',
    'tiempo' : 24,
    'UsuarioId' : 1112131415
}

const permisos = [{
    'permiso': 'SUPER ADMIN',
    'permisoKey': 'P_ADMIN'
},
{
    'permiso': 'Slider de fotos',
    'permisoKey': 'P_SLIDER'
},
{
    'permiso': 'Anuncios',
    'permisoKey': 'P_ANUNCIOS'
},
{
    'permiso': 'Menú Innovación Educativa',
    'permisoKey': 'P_MENU'
},
{
    'permiso': 'Galeria y Eventos',
    'permisoKey': 'P_GALERIA'
},
{
    'permiso': 'Videos',
    'permisoKey': 'P_VIDEOS'
},
{
    'permiso': 'Magazine - Periodico Escolar',
    'permisoKey': 'P_MAGAZINE'
},
{
    'permiso': 'Blogs',
    'permisoKey': 'P_BLOGS'
},
{
    'permiso': 'Gobierno Escolar',
    'permisoKey': 'P_GOBIERNO'
},
{
    'permiso': 'Estudiantes',
    'permisoKey': 'P_ESTUDIANTES'
},
{
    'permiso': 'Plataformas Acádemicas',
    'permisoKey': 'P_PLATFORMAS_ACADEMICAS'
},
{
    'permiso': 'Noticias',
    'permisoKey': 'P_NOTICIAS'
},
{
    'permiso': 'Link de Archivos y direcciones',
    'permisoKey': 'P_LINKS'
},
{
    'permiso': 'Historial',
    'permisoKey': 'P_HISTORIAL'
},
{
    'permiso': 'PQRS',
    'permisoKey': 'P_PQRS'
},
{
    'permiso': 'Recibir Notificaciones',
    'permisoKey': 'P_NOTIFICACIONES'
},
{
    'permiso': 'Actualizar Clave Especial de registro',
    'permisoKey': 'P_CLAVE_ESPECIAL'
},
{
    'permiso': 'Editar informacion de usuarios',
    'permisoKey': 'P_USUARIOS'
}
]

const roles = [
    {
        'rol':'Estudiante Especial',
        'rolKey':'EST_E'
    },
    {
        'rol':'Docente',
        'rolKey':'DOC'
    },
    {
        'rol':'Personal Administrativo',
        'rolKey':'P_ADM'
    },
    {
        'rol':'Coordinador',
        'rolKey':'COOR'
    },
    {
        'rol':'Web Master',
        'rolKey':'WM'
    }
]

const secciones = [
    {
        'seccion':'Prueba',
        'seccionKey':'S_PRUEBA'
    },
    {
        'seccion':'Prueba 2',
        'seccionKey':'S_PRUEBA2'
    },
    {
        'seccion':'Prueba 3',
        'seccionKey':'S_PRUEBA3'
    }
]

const passwordUsuario = bcrypt.hashSync(process.env.PASSWORD_WM, saltos)
const usuario = {
    'apellido': 'tio',
    'celular': '3225201928',
    'correo': 'tutio@gmail.com',
    'fechaNacimiento': '2020-06-09',
    'id': process.env.ID_WM,
    'nombre': 'tuu',
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
    usuario
}
