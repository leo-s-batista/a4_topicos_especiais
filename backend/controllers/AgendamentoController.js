import AgendamentoDB from "../database/AgendamentoDB.js";
import Agendamento from "../models/Agendamento.js";
import CancelamentoDB from '../database/CancelamentoDB.js';
import Cancelamento from '../models/Cancelamento.js';


export default class AgendamentoController {
    static async getHorariosDisponiveis(data, tipoConsultaId, medicoId) {
        try {
            return AgendamentoDB.getHorariosDisponiveis(data, tipoConsultaId, medicoId);
        } catch (error) {
            throw new Error(`Erro ao buscar horários disponíveis: ${error.message}`);
        }
    }
    static async create(agendamentoData) {
        try {
            const agendamento = new Agendamento(
                agendamentoData.pacienteId,
                agendamentoData.tipoConsultaId,
                agendamentoData.status,
                agendamentoData.retorno,
                agendamentoData.motivoConsulta,
                agendamentoData.data,
                agendamentoData.dataAgendamento,
                agendamentoData.funcionarioId,
                agendamentoData.medicoId,
            );
            return AgendamentoDB.insert(agendamento);
        } catch (error) {
            throw new Error(`Erro ao criar agendamento: ${error.message}`);
        }
    }
    static async getByPaciente(id) {
        try {
            return AgendamentoDB.getByPaciente(id);
        } catch (error) {
            throw new Error(`Erro ao buscar agendamentos do paciente: ${error.message}`);
        }
    }
    static async cancelarAgendamento(agendamentoId, motivo, funcionarioId) {
        try {
            await AgendamentoDB.updateStatus(agendamentoId, 0);

            await CancelamentoDB.insert(new Cancelamento(agendamentoId, funcionarioId, new Date(), motivo));
        } catch (error) {
            throw new Error(`Erro ao cancelar o agendamento: ${error.message}`);
        }
    }
}