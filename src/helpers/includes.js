const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/;

export const validarPassword = (password) => {

    return passwordRegex.test(data);
}

export const validarEmail = (email) => {

    return emailRegex.test(data);
}

export const esMayorDe15 = (fechaNacimiento) => {
    const fechaActual = new Date();

    const edad = (fechaActual.getFullYear() - fechaNacimiento.getFullYear());

    return edad >= 15;
}