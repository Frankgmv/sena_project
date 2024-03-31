/* eslint-disable no-undef */
import serverTest from '../serverTest.js'
import seccionRoutes from '../../src/routes/data/seccion.routes.js'
const request = serverTest(seccionRoutes)

describe('[ Rutas / Secciones]', () => {
    it('Debe retornar un status 200', async () => {
        const expected = 200

        const {
            status: result
        } = await request.get('/data/secciones')

        expect(result).toEqual(expected)
    })

    it('Debe retornar un array de objetos en la data', async () => {
        const expected = 0

        const {
            body: {
                data: result
            }
        } = await request.get('/data/secciones')

        expect(result).not.toHaveLength(expected)
    })

    it('Debe retornar un objeto especifico', async () => {
        const expected = 1

        const {
            body: {
                data: result
            }
        } = await request.get('/data/secciones/1')

        expect(result.id).toBe(expected)
    })
})
