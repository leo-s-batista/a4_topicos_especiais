import Funcionario from "../models/Funcionario.js";
import Connect from "./Database.js";

export default class FuncionarioDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM funcionario");

        for (const row of rows) {
            const funcionario = new Funcionario(row.nome, row.funcao, row.email, row.senha, row.avatar);
            funcionario.id = row.id;
            result.push(funcionario);
        }

        return result;
    }

    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM funcionario WHERE id = ?", [id]);

        for (const row of rows) {
            const funcionario = new Funcionario(row.nome, row.funcao, row.email, row.senha, row.avatar);
            funcionario.id = row.id;
            result = funcionario;
        }

        return result;
    }

    static async search(nome) {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM funcionario WHERE nome LIKE ?", [`%${nome}%`]);

        for (const row of rows) {
            const funcionario = new Funcionario(row.nome, row.funcao, row.email, row.senha, row.avatar);
            funcionario.id = row.id;
            result.push(funcionario);
        }

        return result;
    }

    static async insert(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = "INSERT INTO funcionario (nome, funcao, email, senha, avatar) VALUES (?, ?, ?, ?, ?);";
            const values = [funcionario.nome, funcionario.funcao, funcionario.email, funcionario.senha, funcionario.avatar];
            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = "UPDATE funcionario SET nome = ?, funcao = ?, email = ?, senha = ?, avatar = ? WHERE id = ?;";
            const values = [funcionario.nome, funcionario.funcao, funcionario.email, funcionario.senha, funcionario.avatar, funcionario.id];
            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM funcionario WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }
}
