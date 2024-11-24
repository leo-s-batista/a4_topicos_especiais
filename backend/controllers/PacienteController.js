import Paciente from '../models/Paciente.js';
import PacienteDB from '../database/PacienteDB.js';

export default class PacienteController {
    static all() {
        return PacienteDB.all();
    }
    static get(id) {
        return PacienteDB.get(id);
    }
    static search(cpf) {
        return PacienteDB.search(cpf);
    }
    static insert(pacienteData) {
        const paciente = new Paciente(
            pacienteData.nome,
            pacienteData.email,
            pacienteData.cpf,
            pacienteData.n_plano_saude,
            pacienteData.sexo,
            pacienteData.data_nascimento,
            pacienteData.endereco,
            pacienteData.telefone
        );
        return PacienteDB.insert(paciente);
    }

    static update(pacienteData) {
        const paciente = new Paciente(
            pacienteData.nome,
            pacienteData.email,
            pacienteData.cpf,
            pacienteData.n_plano_saude,
            pacienteData.sexo,
            pacienteData.data_nascimento,
            pacienteData.endereco,
            pacienteData.telefone
        );
        paciente.id = pacienteData.id;
        return PacienteDB.update(paciente);
    }

    static delete(id) {
        return PacienteDB.delete(id);
    }
}
