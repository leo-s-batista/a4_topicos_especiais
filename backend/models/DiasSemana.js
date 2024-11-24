export default class DiasSemana {
    #id;
    #segunda;
    #terca;
    #quarta;
    #quinta;
    #sexta;

    constructor(segunda = null, terca = null, quarta = null, quinta = null, sexta = null) {
        this.#segunda = segunda;
        this.#terca = terca;
        this.#quarta = quarta;
        this.#quinta = quinta;
        this.#sexta = sexta;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get segunda() {
        return this.#segunda;
    }
    set segunda(value) {
        this.#segunda = value;
    }

    get terca() {
        return this.#terca;
    }
    set terca(value) {
        this.#terca = value;
    }

    get quarta() {
        return this.#quarta;
    }
    set quarta(value) {
        this.#quarta = value;
    }

    get quinta() {
        return this.#quinta;
    }
    set quinta(value) {
        this.#quinta = value;
    }

    get sexta() {
        return this.#sexta;
    }
    set sexta(value) {
        this.#sexta = value;
    }

    toJSON() {
        return {
            id: this.#id,
            segunda: this.#segunda,
            terca: this.#terca,
            quarta: this.#quarta,
            quinta: this.#quinta,
            sexta: this.#sexta
        };
    }
}
