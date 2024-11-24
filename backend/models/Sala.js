export default class Sala {
    #id;
    #nome;

    constructor(nome) {
        this.#nome = nome;
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

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
        };
    }
}
