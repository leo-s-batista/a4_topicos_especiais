export default class Paciente {
    #id;
    #nome;
    #email;
    #cpf;
    #n_plano_saude;
    #sexo;
    #data_nascimento;
    #endereco;
    #telefone;

    constructor(nome, email, cpf, n_plano_saude, sexo, data_nascimento, endereco, telefone) {
        this.#nome = nome;
        this.#email = email;
        this.#cpf = cpf;
        this.#n_plano_saude = n_plano_saude;
        this.#sexo = sexo;
        this.#data_nascimento = data_nascimento;
        this.#endereco = endereco;
        this.#telefone = telefone;
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
    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#cpf = value;
    }

    get n_plano_saude() {
        return this.#n_plano_saude;
    }
    set n_plano_saude(value) {
        this.#n_plano_saude = value;
    }

    get sexo() {
        return this.#sexo;
    }
    set sexo(value) {
        this.#sexo = value;
    }

    get data_nascimento() {
        return this.#data_nascimento;
    }
    set data_nascimento(value) {
        this.#data_nascimento = value;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(value) {
        this.#endereco = value;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(value) {
        this.#telefone = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            cpf: this.#cpf,
            n_plano_saude: this.#n_plano_saude,
            sexo: this.#sexo,
            data_nascimento: this.#data_nascimento,
            endereco: this.#endereco,
            telefone: this.#telefone
        };
    }
}