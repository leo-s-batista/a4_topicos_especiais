import Connect from './Database.js';
import Cancelamento from '../models/Cancelamento.js';

export default class CancelamentoDB {
    static async insert(cancelamento) {
        if (cancelamento instanceof Cancelamento) {
            const sql = `
                INSERT INTO cancelamento (agendamento_id, funcionario_id, data, motivo)
                VALUES (?, ?, ?, ?);
            `;
            const values = [
                cancelamento.agendamentoId,
                cancelamento.funcionarioId,
                cancelamento.data,
                cancelamento.motivo,
            ];

            const conn = await Connect();
            await conn.query(sql, values);
        } else {
            throw new Error('Objeto inválido para inserção na tabela Cancelamento.');
        }
    }
}
