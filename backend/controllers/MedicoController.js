import Medico from '../models/Medico.js';
import MedicoDB from '../database/MedicoDB.js';
import TipoConsultaDB from '../database/TipoConsultaDB.js';

export default class MedicoController {

    static all() {
        return MedicoDB.all();
    }
    static get(id) {
        return MedicoDB.get(id);
    }
    static search(cpf) {
        return MedicoDB.search(cpf);
    }

    static insert(medicoData) {
        const medico = new Medico(
            medicoData.nome,
            medicoData.cpf,
            medicoData.crm,
            medicoData.rqe,
            medicoData.email,
            medicoData.senha
        );
        return MedicoDB.insert(medico);
    }

    static async update(medicoData) {
        const medico = new Medico(
            medicoData.nome,
            medicoData.cpf,
            medicoData.crm,
            medicoData.rqe,
            medicoData.email,
            medicoData.senha
        );
        medico.id = medicoData.id;

        const tiposConsulta = await TipoConsultaDB.all();

        for (const tipoConsulta of tiposConsulta) {
            MedicoDB.removeTipoConsulta(medico.id, tipoConsulta.id);

            if (medicoData.tiposConsulta && medicoData.tiposConsulta.includes(tipoConsulta.id)) {
                MedicoDB.addTipoConsulta(medico.id, tipoConsulta.id);
            }
        }
        return MedicoDB.update(medico);
    }

    static delete(id) {
        return MedicoDB.delete(id);
    }

    static removeTipoConsulta(medicoId, tipoConsultaId) {
        return MedicoDB.removeTipoConsulta(medicoId, tipoConsultaId);
    }

    static addTipoConsulta(medicoId, tipoConsultaId) {
        return MedicoDB.addTipoConsulta(medicoId, tipoConsultaId);
    }
}