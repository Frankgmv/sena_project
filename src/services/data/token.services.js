import { Op } from "sequelize";
import Token from "../../models/data/token.js";

export const postTokenService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encontrarToken = await Token.findOne({
                where: {
                    [Op.or]: {
                        tokenKey: data.tokenKey,
                        nombre: data.nombre
                    }
                }
            })

            if (encontrarToken) {
                resolve({
                    ok: false,
                    message: "TokenKey o nombre ya usados."
                })
            }

            const guardarToken = new Token(data);
            const resp = await guardarToken.save();

            resolve({
                ok: true,
                message: "Token creado.",
                token: resp
            })

        } catch (error) {
            reject(error);
        }
    });
}

export const getAllTokenService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const AllTokens = await Token.findAll();

            resolve({
                ok: true,
                message: "Tokens obtenidos.",
                tokens: AllTokens
            })

        } catch (error) {
            reject(error);
        }
    });
}
export const getTokenService = (idToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokens = await Token.findByPk(idToken);

            if (!tokens) return resolve({
                ok: false,
                message: "Token no encontrado."
            })

            resolve({
                ok: true,
                message: "Token obtenido.",
                tokens: tokens
            })
        } catch (error) {
            reject(error);
        }
    });
}

export const putTokenService = (idToken, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encontrarToken = await Token.findByPk(idToken)

            if (!encontrarToken) {
                resolve({
                    ok: false,
                    message: "Token no encontrado."
                })
            }

            const actualizarToken = await encontrarToken.update(data);
            const resp = await actualizarToken.save();

            resolve({
                ok: true,
                message: "Token actualizado.",
                token: resp
            })
        } catch (error) {
            reject(error);
        }
    });
}
export const deleteTokenService = (idToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenEliminado = await Token.findByPk(idToken);

            if (!tokenEliminado) return resolve({
                ok: false,
                message: "Token no encontrado."
            })

            await tokenEliminado.destroy();

            resolve({
                ok: true,
                message: "Token Eliminado."
            })
            
        } catch (error) {
            reject(error);
        }
    });
}