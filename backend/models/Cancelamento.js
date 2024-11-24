export default class Cancelamento {
    #id;
    #agendamentoId;
    #funcionarioId;
    #data;
    #motivo;

    constructor(agendamentoId, funcionarioId, data, motivo = null) {
        this.#agendamentoId = agendamentoId;
        this.#funcionarioId = funcionarioId;
        this.#data = data;
        this.#motivo = motivo;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get agendamentoId() {
        return this.#agendamentoId;
    }
    set agendamentoId(value) {
        this.#agendamentoId = value;
    }

    get funcionarioId() {
        return this.#funcionarioId;
    }
    set funcionarioId(value) {
        this.#funcionarioId = value;
    }

    get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = value;
    }

    get motivo() {
        return this.#motivo;
    }
    set motivo(value) {
        this.#motivo = value;
    }

    toJSON() {
        return {
            id: this.#id,
            agendamentoId: this.#agendamentoId,
            funcionarioId: this.#funcionarioId,
            data: this.#data,
            motivo: this.#motivo,
        };
    }
}
