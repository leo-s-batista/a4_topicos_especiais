import TipoConsulta from "../models/TipoConsulta.js";
import Medico from "../models/Medico.js";
import Connect from "./Database.js";

export default class TipoConsultaDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM tipo_consulta");

        for (const row of rows) {
            const tipoConsulta = new TipoConsulta(
                row.descricao,
                row.duracao,
                row.sala_id,
                row.dias_semana_id
            );
            tipoConsulta.id = row.id;

            result.push(tipoConsulta);
        }
        return result;
    }

    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM tipo_consulta WHERE id = ?", [id]);

        for (const row of rows) {
            const tipoConsulta = new TipoConsulta(
                row.descricao,
                row.duracao,
                row.sala_id,
                row.dias_semana_id
            );
            tipoConsulta.id = row.id;

            result = tipoConsulta;
        }

        return result;
    }

    static async search(descricao) {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM tipo_consulta WHERE descricao LIKE ?", [`%${descricao}%`]);

        for (const row of rows) {
            const tipoConsulta = new TipoConsulta(
                row.descricao,
                row.duracao,
                row.sala_id,
                row.dias_semana_id
            );
            tipoConsulta.id = row.id;

            result.push(tipoConsulta);
        }

        return result;
    }

    static async insert(tipoConsulta) {
        if (tipoConsulta instanceof TipoConsulta) {
            const sql =
                "INSERT INTO tipo_consulta (descricao, duracao, sala_id, dias_semana_id) VALUES (?, ?, ?, ?);";
            const values = [
                tipoConsulta.descricao,
                tipoConsulta.duracao,
                tipoConsulta.salaId,
                tipoConsulta.diasSemanaId,
            ];
            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(tipoConsulta) {
        if (tipoConsulta instanceof TipoConsulta) {
            const sql =
                "UPDATE tipo_consulta SET descricao = ?, duracao = ?, sala_id = ?, dias_semana_id = ? WHERE id = ?;";
            const values = [
                tipoConsulta.descricao,
                tipoConsulta.duracao,
                tipoConsulta.salaId,
                tipoConsulta.diasSemanaId,
                tipoConsulta.id,
            ];
            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM tipo_consulta WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }

    static async getMedicosByTipoConsulta(id) {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query(
            "SELECT m.* FROM medico m JOIN medico_has_tipo_consulta mtc ON m.id = mtc.medico_id WHERE mtc.tipo_consulta_id = ?;",
            [id]
        );

        for (const row of rows) {
            const medico = new Medico(row.nome, row.cpf, row.crm, row.rqe, row.email, row.senha);
            medico.id = row.id;

            result.push(medico);
        }

        return result;
    }

    static async getByMedico(id) {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query(
            "SELECT tc.* FROM tipo_consulta tc JOIN medico_has_tipo_consulta mtc ON tc.id = mtc.tipo_consulta_id WHERE mtc.medico_id = ?;",
            [id]
        );

        for (const row of rows) {
            const tipoConsulta = new TipoConsulta(row.descricao, row.duracao, row.sala_id, row.dias_semana_id);
            tipoConsulta.id = row.id;

            result.push(tipoConsulta);
        }

        return result;
    }
}
