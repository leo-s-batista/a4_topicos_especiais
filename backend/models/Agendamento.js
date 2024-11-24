export default class Agendamento {
    #id;
    #pacienteId;
    #tipoConsultaId;
    #status;
    #retorno;
    #motivoConsulta;
    #data;
    #dataAgendamento;
    #funcionarioId;
    #medicoId;

    constructor(pacienteId, tipoConsultaId, status, retorno, motivoConsulta, data, dataAgendamento, funcionarioId = null, medicoId = null) {
        this.#pacienteId = pacienteId;
        this.#tipoConsultaId = tipoConsultaId;
        this.#status = status;
        this.#retorno = retorno;
        this.#motivoConsulta = motivoConsulta;
        this.#data = data;
        this.#dataAgendamento = dataAgendamento;
        this.#funcionarioId = funcionarioId;
        this.#medicoId = medicoId;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get pacienteId() {
        return this.#pacienteId;
    }
    set pacienteId(value) {
        this.#pacienteId = value;
    }

    get tipoConsultaId() {
        return this.#tipoConsultaId;
    }
    set tipoConsultaId(value) {
        this.#tipoConsultaId = value;
    }

    get status() {
        return this.#status;
    }
    set status(value) {
        this.#status = value;
    }

    get retorno() {
        return this.#retorno;
    }
    set retorno(value) {
        this.#retorno = value;
    }

    get motivoConsulta() {
        return this.#motivoConsulta;
    }
    set motivoConsulta(value) {
        this.#motivoConsulta = value;
    }

    get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = value;
    }

    get dataAgendamento() {
        return this.#dataAgendamento;
    }
    set dataAgendamento(value) {
        this.#dataAgendamento = value;
    }

    get funcionarioId() {
        return this.#funcionarioId;
    }
    set funcionarioId(value) {
        this.#funcionarioId = value;
    }

    get medicoId() {
        return this.#medicoId;
    }
    set medicoId(value) {
        this.#medicoId = value;
    }

    toJSON() {
        return {
            id: this.#id,
            pacienteId: this.#pacienteId,
            tipoConsultaId: this.#tipoConsultaId,
            status: this.#status,
            retorno: this.#retorno,
            motivoConsulta: this.#motivoConsulta,
            data: this.#data,
            dataAgendamento: this.#dataAgendamento,
            funcionarioId: this.#funcionarioId,
            medicoId: this.#medicoId
        };
    }
}
