import Express from 'express'
import supertest from 'supertest'

// Servidor para probar las rutas de manera individuales.
const serverTest = (route) => {
    const app = Express()
    route(app)
    return supertest(app)
}

export default serverTest
