import LoginDB from "../database/LoginDB.js";

import jwt from 'jsonwebtoken'

export default class LoginController {
    static async login(email, senha) {
        const user = await LoginDB.login(email, senha)

        if (user) {
            delete user.senha

            if (typeof user.funcao === 'undefined') {
                user.funcao = 2
            }

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1hr' })

            return token;
        } else {
            throw new Error('Invalid email or password');
        }

    }
}