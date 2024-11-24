import Funcionario from '../models/Funcionario.js';
import FuncionarioDB from '../database/FuncionarioDB.js';

export default class FuncionarioController {
    static all() {
        return FuncionarioDB.all();
    }

    static get(id) {
        return FuncionarioDB.get(id);
    }

    static search(nome) {
        return FuncionarioDB.search(nome);
    }

    static insert(funcionarioData) {
        const funcionario = new Funcionario(
            funcionarioData.nome,
            funcionarioData.funcao,
            funcionarioData.email,
            funcionarioData.senha,
            funcionarioData.avatar
        );
        return FuncionarioDB.insert(funcionario);
    }

    static update(funcionarioData) {
        const funcionario = new Funcionario(
            funcionarioData.nome,
            funcionarioData.funcao,
            funcionarioData.email,
            funcionarioData.senha,
            funcionarioData.avatar
        );
        funcionario.id = funcionarioData.id;
        return FuncionarioDB.update(funcionario);
    }

    static delete(id) {
        return FuncionarioDB.delete(id);
    }
}
