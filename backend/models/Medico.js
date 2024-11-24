export default class Medico {
    #id;
    #nome;
    #cpf;
    #crm;
    #rqe;
    #email;
    #senha;

    constructor(nome, cpf, crm, rqe, email, senha) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#crm = crm;
        this.#rqe = rqe;
        this.#email = email;
        this.#senha = senha;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#cpf = value;
    }

    get crm() {
        return this.#crm;
    }
    set crm(value) {
        this.#crm = value;
    }

    get rqe() {
        return this.#rqe;
    }
    set rqe(value) {
        this.#rqe = value;
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }
    set senha(value) {
        this.#senha = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cpf: this.#cpf,
            crm: this.#crm,
            rqe: this.#rqe,
            email: this.#email,
            senha: this.#senha
        };
    }
}