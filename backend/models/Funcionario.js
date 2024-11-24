export default class Funcionario {
    #id;
    #nome;
    #funcao;
    #email;
    #senha;
    #avatar;

    constructor(nome, funcao, email, senha, avatar = null) {
        this.#nome = nome;
        this.#funcao = funcao;
        this.#email = email;
        this.#senha = senha;
        this.#avatar = avatar;
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

    get funcao() {
        return this.#funcao;
    }
    set funcao(value) {
        this.#funcao = value;
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

    get avatar() {
        return this.#avatar;
    }
    set avatar(value) {
        this.#avatar = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            funcao: this.#funcao,
            email: this.#email,
            senha: this.#senha,
            avatar: this.#avatar,
        };
    }
}
