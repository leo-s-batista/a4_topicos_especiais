import DiasSemana from "../models/DiasSemana.js";
import Connect from "./Database.js";

export default class DiasSemanaDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM dias_semana");

        for (const row of rows) {
            const diasSemana = new DiasSemana(
                row.segunda ? JSON.parse(row.segunda) : null,
                row.terca ? JSON.parse(row.terca) : null,
                row.quarta ? JSON.parse(row.quarta) : null,
                row.quinta ? JSON.parse(row.quinta) : null,
                row.sexta ? JSON.parse(row.sexta) : null
            );
            diasSemana.id = row.id;

            result.push(diasSemana);
        }

        return result;
    }

    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM dias_semana WHERE id = ?", [id]);

        for (const row of rows) {
            const diasSemana = new DiasSemana(
                row.segunda ? JSON.parse(row.segunda) : null,
                row.terca ? JSON.parse(row.terca) : null,
                row.quarta ? JSON.parse(row.quarta) : null,
                row.quinta ? JSON.parse(row.quinta) : null,
                row.sexta ? JSON.parse(row.sexta) : null
            );
            diasSemana.id = row.id;

            result = diasSemana;
        }

        return result;
    }

    static async insert(diasSemana) {
        if (diasSemana instanceof DiasSemana) {
            const sql =
                "INSERT INTO dias_semana (segunda, terca, quarta, quinta, sexta) VALUES (?, ?, ?, ?, ?);";
            const values = [
                diasSemana.segunda ? JSON.stringify(diasSemana.segunda) : null,
                diasSemana.terca ? JSON.stringify(diasSemana.terca) : null,
                diasSemana.quarta ? JSON.stringify(diasSemana.quarta) : null,
                diasSemana.quinta ? JSON.stringify(diasSemana.quinta) : null,
                diasSemana.sexta ? JSON.stringify(diasSemana.sexta) : null,
            ];
            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(diasSemana) {
        if (diasSemana instanceof DiasSemana) {
            const sql =
                "UPDATE dias_semana SET segunda = ?, terca = ?, quarta = ?, quinta = ?, sexta = ? WHERE id = ?;";
            const values = [
                JSON.stringify(diasSemana.segunda),
                JSON.stringify(diasSemana.terca),
                JSON.stringify(diasSemana.quarta),
                JSON.stringify(diasSemana.quinta),
                JSON.stringify(diasSemana.sexta),
                diasSemana.id,
            ];
            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM dias_semana WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }
}
