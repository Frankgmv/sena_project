export const maxBytes = 1E7

export const archiveMaxBytes = 1E7 * 4

export const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg']

export const ArchivosPermitidos = ['application/pdf']

const permisosKeyEstudianteEspecial = [
    'P_MENU',
    'P_GALERIA',
    'P_GOBIERNO',
    'P_ESTUDIANTES',
    'P_MAGAZINE',
    'P_NOTICIAS'
]

const permisosKeyDocente = [
    ...permisosKeyEstudianteEspecial,
    'P_BLOGS',
    'P_ANUNCIOS',
    'P_PLATFORMAS_ACADEMICAS',
    'P_NOTIFICACIONES'
]

const permisosKeyPersonalAdministrador = [
    'P_MENU',
    'P_SLIDER',
    'P_VIDEOS',
    'P_ANUNCIOS',
    'P_GOBIERNO',
    'P_ESTUDIANTES',
    'P_NOTICIAS',
    'P_NOTIFICACIONES',
    'P_USUARIOS'
]

const permisosKeyCoordinador = [
    ...permisosKeyPersonalAdministrador,
    'P_GALERIA',
    'P_BLOGS',
    'P_MAGAZINE',
    'P_HISTORIAL',
    'P_PLATFORMAS_ACADEMICAS',
    'P_NOTIFICACIONES'
]

const permisosKeyWM = [
    'P_ADMIN',
    'P_SLIDER',
    'P_HISTORIAL',
    'P_ANUNCIOS',
    'P_MENU',
    'P_GALERIA',
    'P_VIDEOS',
    'P_MAGAZINE',
    'P_BLOGS',
    'P_GOBIERNO',
    'P_ESTUDIANTES',
    'P_PLATFORMAS_ACADEMICAS',
    'P_NOTICIAS',
    'P_LINKS',
    'P_NOTIFICACIONES',
    'P_CLAVE_ESPECIAL',
    'P_USUARIOS'
]

export const variablesPermisos = {
    EST_E: permisosKeyEstudianteEspecial,
    DOC: permisosKeyDocente,
    P_ADM: permisosKeyPersonalAdministrador,
    COOR: permisosKeyCoordinador,
    WM: permisosKeyWM
}
