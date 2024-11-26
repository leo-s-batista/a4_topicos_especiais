import LoginDB from "../database/LoginDB.js";

import jwt from 'jsonwebtoken'

export default class LoginController {
    static async login(email, senha) {
        const user = await LoginDB.login(email, senha)

        if (user) {
            delete user.senha

            if (user.funcao && user.funcao !== 0 && user.funcao !== 1) {
                user.funcao = 2
            }

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '60s' })

            return token;
        } else {
            throw new Error('Invalid email or password');
        }

    }
}