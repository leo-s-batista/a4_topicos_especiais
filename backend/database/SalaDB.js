import Sala from "../models/Sala.js";
import Connect from "./Database.js";

export default class SalaDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM sala");

        for (const row of rows) {
            const sala = new Sala(row.nome);
            sala.id = row.id;
            result.push(sala);
        }

        return result;
    }

    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM sala WHERE id = ?", [id]);

        for (const row of rows) {
            const sala = new Sala(row.nome);
            sala.id = row.id;
            result = sala;
        }

        return result;
    }

    static async insert(sala) {
        if (sala instanceof Sala) {
            const sql = "INSERT INTO sala (nome) VALUES (?);";
            const values = [sala.nome];
            const conn = await Connect();

            const [rs] = await conn.query(sql, values);
            return rs.insertId;
        }
    }

    static async update(sala) {
        if (sala instanceof Sala) {
            const sql = "UPDATE sala SET nome = ? WHERE id = ?;";
            const values = [sala.nome, sala.id];
            const conn = await Connect();

            await conn.query(sql, values);
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM sala WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }
}
