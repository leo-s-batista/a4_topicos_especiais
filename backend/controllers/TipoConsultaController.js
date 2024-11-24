import TipoConsulta from "../models/TipoConsulta.js";
import TipoConsultaDB from "../database/TipoConsultaDB.js";
import DiasSemanaDB from "../database/DiasSemanaDB.js";
export default class TipoConsultaController {
    static all() {
        return TipoConsultaDB.all();
    }

    static get(id) {
        return TipoConsultaDB.get(id);
    }

    static search(descricao) {
        return TipoConsultaDB.search(descricao);
    }

    static insert(tipoConsultaData) {
        const tipoConsulta = new TipoConsulta(
            tipoConsultaData.descricao,
            tipoConsultaData.duracao,
            tipoConsultaData.salaId,
            tipoConsultaData.diasSemanaId
        );
        return TipoConsultaDB.insert(tipoConsulta);
    }

    static update(tipoConsultaData) {
        const tipoConsulta = new TipoConsulta(
            tipoConsultaData.descricao,
            tipoConsultaData.duracao,
            tipoConsultaData.salaId,
            tipoConsultaData.diasSemanaId
        );
        tipoConsulta.id = tipoConsultaData.id;
        return TipoConsultaDB.update(tipoConsulta);
    }

    static async delete(id) {
        try {
            let result = true
            const tipoConsulta = await TipoConsultaDB.get(id);
            result &= await TipoConsultaDB.delete(id);
            if (tipoConsulta.diasSemanaId) {
                result &= await DiasSemanaDB.delete(tipoConsulta.diasSemanaId);
            }

            return result

        } catch (error) {
            throw new Error(`Erro ao excluir Tipo de Consulta: ${error.message}`);
        }
    }

    static async getMedicosByTipoConsulta(id) {
        try {
            return TipoConsultaDB.getMedicosByTipoConsulta(id);
        } catch (error) {
            throw new Error(`Erro ao buscar médicos: ${error.message}`);
        }
    }

    static async getByMedico(id) {
        try {
            return TipoConsultaDB.getByMedico(id);
        } catch (error) {
            throw new Error(`Erro ao buscar tipos de consulta: ${error.message}`);
        }
    }
}
