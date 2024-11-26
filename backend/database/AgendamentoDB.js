import Agendamento from "../models/Agendamento.js";
import Connect from "./Database.js";

export default class AgendamentoDB {
    static async all() {
        const result = [];
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM agendamento");

        for (const row of rows) {
            const agendamento = new Agendamento(
                row.paciente_id,
                row.tipo_consulta_id,
                row.status,
                row.retorno,
                row.motivo_consulta,
                row.data,
                row.data_agendamento,
                row.funcionario_id,
                row.medico_id
            );
            agendamento.id = row.id;

            result.push(agendamento);
        }

        return result;
    }

    static async get(id) {
        let result = {};
        const conn = await Connect();
        const [rows] = await conn.query("SELECT * FROM agendamento WHERE id = ?", [id]);

        for (const row of rows) {
            const agendamento = new Agendamento(
                row.paciente_id,
                row.tipo_consulta_id,
                row.status,
                row.retorno,
                row.motivo_consulta,
                row.data,
                row.data_agendamento,
                row.funcionario_id,
                row.medico_id
            );
            agendamento.id = row.id;

            result = agendamento;
        }

        return result;
    }

    static async insert(agendamento) {
        if (agendamento instanceof Agendamento) {
            const sql = `
                INSERT INTO agendamento 
                (paciente_id, tipo_consulta_id, status, retorno, motivo_consulta, data, data_agendamento, funcionario_id, medico_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const values = [
                agendamento.pacienteId,
                agendamento.tipoConsultaId,
                agendamento.status,
                agendamento.retorno,
                agendamento.motivoConsulta,
                agendamento.data,
                agendamento.dataAgendamento,
                agendamento.funcionarioId,
                agendamento.medicoId,
            ];

            const conn = await Connect();

            const [result] = await conn.query(sql, values);
            return result.insertId;
        } else {
            throw new Error('O objeto fornecido não é uma instância de Agendamento.');
        }
    }

    static async delete(id) {
        const conn = await Connect();
        const sql = "DELETE FROM agendamento WHERE id = ?;";
        const values = [id];

        await conn.query(sql, values);
    }

    static async getHorariosDisponiveis(data, tipoConsultaId, medicoId) {
        const conn = await Connect();

        const [diasSemanaRows] = await conn.query(
            `
            SELECT ds.segunda, ds.terca, ds.quarta, ds.quinta, ds.sexta, tc.duracao
            FROM dias_semana ds
            INNER JOIN tipo_consulta tc ON tc.dias_semana_id = ds.id
            WHERE tc.id = ?
            `,
            [tipoConsultaId]
        );

        const indexDia = new Date(data).getDay();

        const diaKey = Object.keys(diasSemanaRows[0])[indexDia];
        let diaSemana = diasSemanaRows[0][diaKey];

        if (!diaSemana || diaSemana === "null") {
            return [];
        }

        diaSemana = JSON.parse(diaSemana);

        const start = diaSemana.start;
        const end = diaSemana.end;
        const duracaoTipoConsulta = parseInt(diasSemanaRows[0].duracao, 10);

        const horarios = [];
        let horaAtual = start;

        while (horaAtual < end) {
            horarios.push(horaAtual);
            const [hora, minutos] = horaAtual.split(":").map(Number);
            const novaHora = new Date(0, 0, 0, hora, minutos + duracaoTipoConsulta);
            horaAtual = novaHora.toTimeString().slice(0, 5);
        }


        const [agendamentos] = await conn.query(
            `
            SELECT TIME(data) AS horario, TIME(DATE_ADD(data, INTERVAL tc.duracao MINUTE)) AS horario_fim
            FROM agendamento a
            INNER JOIN tipo_consulta tc ON a.tipo_consulta_id = tc.id
            WHERE DATE(data) = ? AND medico_id = ? AND status = 1
            `,
            [data, medicoId]
        );


        const intervalosOcupados = agendamentos.map((row) => ({
            inicio: row.horario,
            fim: row.horario_fim,
        }));


        const horariosDisponiveis = horarios.filter((horario) => {
            const [hora, minutos] = horario.split(":").map(Number);
            const horarioInicio = new Date(0, 0, 0, hora, minutos);
            const horarioFim = new Date(
                0,
                0,
                0,
                hora,
                minutos + duracaoTipoConsulta
            );


            return !intervalosOcupados.some((intervalo) => {
                const intervaloInicio = new Date(
                    0,
                    0,
                    0,
                    ...intervalo.inicio.split(":").map(Number)
                );
                const intervaloFim = new Date(
                    0,
                    0,
                    0,
                    ...intervalo.fim.split(":").map(Number)
                );

                return (
                    (horarioInicio >= intervaloInicio && horarioInicio < intervaloFim) ||
                    (horarioFim > intervaloInicio && horarioFim <= intervaloFim)
                );
            });
        });

        return horariosDisponiveis;
    }

    static async getByPaciente(id) {
        const result = [];
        const conn = await Connect();

        const [rows] = await conn.query(
            `
            SELECT 
                a.*, 
                m.nome AS nomeMedico, 
                tc.descricao AS nomeTipoConsulta,
                f.nome AS nomeFuncionario
            FROM agendamento a
            LEFT JOIN medico m ON a.medico_id = m.id
            LEFT JOIN tipo_consulta tc ON a.tipo_consulta_id = tc.id
            LEFT JOIN funcionario f ON a.funcionario_id = f.id
            WHERE a.paciente_id = ? AND status = 1
            `,
            [id]
        );

        for (const row of rows) {
            const agendamento = {
                paciente_id: row.paciente_id,
                tipo_consulta_id: row.tipo_consulta_id,
                status: row.status,
                retorno: row.retorno,
                motivo_consulta: row.motivo_consulta,
                data: row.data,
                data_agendamento: row.data_agendamento,
                funcionario_id: row.funcionario_id,
                medico_id: row.medico_id
            };

            agendamento.id = row.id;
            agendamento.nomeMedico = row.nomeMedico;
            agendamento.nomeTipoConsulta = row.nomeTipoConsulta;
            agendamento.nomeFuncionario = row.nomeFuncionario;

            result.push(agendamento);
        }

        return result;
    }
    static async updateStatus(agendamentoId, status) {
        const conn = await Connect();
        const sql = `UPDATE agendamento SET data = data, status = ? WHERE id = ?;`;
        await conn.query(sql, [status, agendamentoId]);
    }
}
