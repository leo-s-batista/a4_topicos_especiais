import Paciente from "../models/Paciente.js";
import Connect from "./Database.js";

export default class PacienteDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM paciente");

        for (const row of rows) {
            const paciente = new Paciente(row.nome, row.email, row.cpf, row.n_plano_saude, row.sexo, row.data_nascimento, row.endereco, row.telefone);
            paciente.id = row.id;

            result.push(paciente);
        }

        return result;
    }
    static async get(id) {
        let result = {}
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM paciente WHERE id = ?", [id]);

        for (const row of rows) {
            const paciente = new Paciente(row.nome, row.email, row.cpf, row.n_plano_saude, row.sexo, row.data_nascimento, row.endereco, row.telefone);
            paciente.id = row.id;

            result = paciente
        }

        return result;
    }
    static async search(cpf) {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM paciente WHERE cpf LIKE ?", [`%${cpf}%`]);

        for (const row of rows) {
            const paciente = new Paciente(row.nome, row.email, row.cpf, row.n_plano_saude, row.sexo, row.data_nascimento, row.endereco, row.telefone);
            paciente.id = row.id;

            result.push(paciente);
        }

        return result;
    }
    static async insert(paciente) {
        if (paciente instanceof Paciente) {
            const sql = "INSERT INTO paciente (nome, email, cpf, n_plano_saude, sexo, data_nascimento, endereco, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

            const values = [paciente.nome, paciente.email, paciente.cpf, paciente.n_plano_saude, paciente.sexo, paciente.data_nascimento, paciente.endereco, paciente.telefone];

            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(paciente) {
        if (paciente instanceof Paciente) {
            const sql = "UPDATE paciente SET nome = ?, email = ?, cpf = ?, n_plano_saude = ?, sexo = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?;";

            const values = [paciente.nome, paciente.email, paciente.cpf, paciente.n_plano_saude, paciente.sexo, paciente.data_nascimento, paciente.endereco, paciente.telefone, paciente.id];

            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();

        const sql = "DELETE FROM paciente WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }
}