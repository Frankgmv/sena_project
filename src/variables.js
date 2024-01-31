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
    'P_PLATFORMAS_ACADEMICAS',
    'P_NOTIFICACIONES'
]

const permisosKeyPersonalAdministrador = [
    'P_MENU',
    'P_SLIDER',
    'P_VIDEOS',
    'P_GOBIERNO',
    'P_ESTUDIANTES',
    'P_NOTICIAS',
    'P_NOTIFICACIONES'
]

const permisosKeyCoordinador = [
    ...permisosKeyPersonalAdministrador,
    'P_GALERIA',
    'P_BLOGS',
    'P_MAGAZINE',
    'P_PLATFORMAS_ACADEMICAS',
    'P_NOTIFICACIONES'
]

const permisosKeyWM = ['P_ADMIN']

export const variablesPermisos = {
    EST_E: permisosKeyEstudianteEspecial,
    DOC: permisosKeyDocente,
    P_ADM: permisosKeyPersonalAdministrador,
    COOR: permisosKeyCoordinador,
    WM: permisosKeyWM
}
