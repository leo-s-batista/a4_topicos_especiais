import Medico from "../models/Medico.js";
import Connect from "./Database.js";

export default class MedicoDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM medico");

        for (const row of rows) {
            const medico = new Medico(row.nome, row.cpf, row.crm, row.rqe, row.email, row.senha);
            medico.id = row.id;

            result.push(medico);
        }

        return result;
    }
    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM medico WHERE id = ?", [id]);

        for (const row of rows) {
            const medico = new Medico(row.nome, row.cpf, row.crm, row.rqe, row.email, row.senha);
            medico.id = row.id;

            result = medico;
        }

        return result;
    }
    static async search(cpf) {

        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM medico WHERE cpf LIKE ?", [`%${cpf}%`]);

        for (const row of rows) {
            const medico = new Medico(row.nome, row.cpf, row.crm, row.rqe, row.email, row.senha);
            medico.id = row.id;

            result.push(medico);
        }

        return result;
    }
    static async insert(medico) {
        if (medico instanceof Medico) {
            const sql = "INSERT INTO medico (nome, cpf, crm, rqe, email, senha) VALUES (?, ?, ?, ?, ?, ?);";
            const values = [medico.nome, medico.cpf, medico.crm, medico.rqe, medico.email, medico.senha];
            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(medico) {
        if (medico instanceof Medico) {
            const sql = "UPDATE medico SET nome = ?, cpf = ?, crm = ?, rqe = ?, email = ?, senha = ? WHERE id = ?;";
            const values = [medico.nome, medico.cpf, medico.crm, medico.rqe, medico.email, medico.senha, medico.id];
            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM medico WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }

    static async removeTipoConsulta(medicoId, tipoConsultaId) {
        const conn = await Connect();
        const sql = "DELETE FROM medico_has_tipo_consulta WHERE medico_id = ? AND tipo_consulta_id = ?;";
        const values = [medicoId, tipoConsultaId];

        await conn.query(sql, values);
    }

    static async addTipoConsulta(medicoId, tipoConsultaId) {
        const conn = await Connect();
        const sql = "INSERT INTO medico_has_tipo_consulta (medico_id, tipo_consulta_id) VALUES (?, ?);";
        const values = [medicoId, tipoConsultaId];

        await conn.query(sql, values);
    }
}