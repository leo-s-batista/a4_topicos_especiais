export default class TipoConsulta {
    #id;
    #descricao;
    #duracao;
    #salaId;
    #diasSemanaId;
    #diasSemana;

    constructor(descricao, duracao, salaId, diasSemanaId = null) {
        this.#descricao = descricao;
        this.#duracao = duracao;
        this.#salaId = salaId;
        this.#diasSemanaId = diasSemanaId;
        this.#diasSemana = {};
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    get duracao() {
        return this.#duracao;
    }
    set duracao(value) {
        this.#duracao = value;
    }

    get salaId() {
        return this.#salaId;
    }
    set salaId(value) {
        this.#salaId = value;
    }

    get diasSemanaId() {
        return this.#diasSemanaId;
    }
    set diasSemanaId(value) {
        this.#diasSemanaId = value;
    }

    get diasSemana() {
        return this.#diasSemana;
    }
    set diasSemana(value) {
        this.#diasSemana = value;
    }

    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao,
            duracao: this.#duracao,
            salaId: this.#salaId,
            diasSemanaId: this.#diasSemanaId,
            diasSemana: this.#diasSemana,
        };
    }
}
