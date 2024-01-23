-- Configuración de formato de fecha
SET datestyle = 'ISO, YMD';

-- * Tabla "pqrs" Informacion 
CREATE TABLE pqrs (
    ide SERIAL PRIMARY KEY,
    nombres VARCHAR(30),
    apellidos VARCHAR(30),
    tipo VARCHAR(15),
    remitente VARCHAR(60),
    correo VARCHAR(100),
    numero_contacto VARCHAR(25),
    mensaje TEXT,
    estado BOOLEAN NOT NULL
);

-- * Tabla "notificaciones" Informacion
CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion VARCHAR(255),
    fecha TIMESTAMP,
    estado BOOLEAN NOT NULL
);

-- * Tabla "vistas" Informacion
CREATE TABLE vistas (
    id SERIAL PRIMARY KEY,
    vistas_totales INT,
    vistas_mes INT,
    vistas_dia INT
);

-- * Tabla "permisos" DATA
CREATE TABLE permisos (
    id SERIAL PRIMARY KEY,
    permiso VARCHAR(50)
);

-- * Tabla "secciones" DATA
CREATE TABLE secciones (
    id SERIAL PRIMARY KEY,
    seccion VARCHAR(30)
    seccionKey VARCHAR(30)
);

-- * Tabla "categorias" DATA
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(30),
    categoriaKey VARCHAR(30)
);

-- * Tabla "roles" DATA
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(40),
    estado BOOLEAN
);

-- * Tabla "usuarios" DATA
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    fecha_nacimiento DATE,
    correo VARCHAR(100),
    celular VARCHAR(10),
    password VARCHAR(120),
    id_rol INT REFERENCES roles(id) ON DELETE CASCADE
);

-- * Tabla "detalle_permiso"
CREATE TABLE detalle_permiso (
    id SERIAL PRIMARY KEY,
    id_permiso INT REFERENCES permisos(id) ON DELETE CASCADE,
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * Tabla "noticias"
CREATE TABLE noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(70),
    fecha TIMESTAMP,
    encabezado VARCHAR(100),
    descripcion TEXT,
    imagenPath VARCHAR(250),
    estado BOOLEAN
);

-- * Tabla "links"
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(70),
    link VARCHAR(255),
    descripcion TEXT,
    fecha TIMESTAMP,
    id_seccion INT REFERENCES secciones(id),
    id_categoria INT REFERENCES categorias(id),
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * pendiente Tabla "anuncios"
CREATE TABLE anuncios (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(70),
    descripcion TEXT,
    imagen VARCHAR(250),
    fecha TIMESTAMP,
    id_seccion INT REFERENCES secciones(id),
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * Tabla "historial"
CREATE TABLE historial (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP,
    cambio VARCHAR(100),
    descripcion TEXT,
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * Tabla "tokens"
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255),
    fecha_creacion TIMESTAMP,
    tiempo_vencimiento VARCHAR(30),
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * Tabla "Items"
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    link VARCHAR(200),
    estado BOOLEAN,
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- ! Tabla "archivos" MULTIMEDIA
CREATE TABLE archivos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),x|
    archivo BYTEA,
    fecha TIMESTAMP,
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- * Tabla "eventos"
CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    nombre_evento VARCHAR(30),
    descripcion_evento VARCHAR(100),
    fecha_evento DATE
);

-- * Tabla "galeria" MULTIMEDIA
CREATE TABLE galeria (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP,
    nombre_evento VARCHAR(50),
    imagen VARCHAR(250),
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT,
    id_evento INT REFERENCES eventos(id)
);

-- ! Tabla "videos" MULTIMEDIA
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    link_video VARCHAR(255),
    fecha TIMESTAMP,
    titulo VARCHAR(100),
    imagen VARCHAR(250),
    id_usuario INT DEFAULT 1 REFERENCES usuarios(id) ON DELETE SET DEFAULT
);

-- ? Tabla "slider" MULTIMEDIA
CREATE TABLE slider (
    id SERIAL PRIMARY KEY,
    id_imagen INT REFERENCES galeria(id) ON DELETE CASCADE
);

-- *Consultas de relleno 

INSERT INTO roles (rol, estado) VALUES ('estudiante', true),
('personal-administrativo', true),
('coordinador', true),
('maestro', true),
('rector', true);


