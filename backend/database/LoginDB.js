import Connect from "./Database.js";
import bcryptjs from 'bcryptjs'

export default class MedicoDB {
    static async login(email, senha) {
        let result = false;

        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM funcionario WHERE email = ? AND senha = ?", [email, senha]);

        if (rows.length) {
            result = rows[0];

        } else {
            const [rows] = await conn.query("SELECT * FROM medico WHERE email = ? AND senha = ?", [email, senha]);

            if (rows.length) {
                result = rows[0];
            }
        }

        return result

    }
}