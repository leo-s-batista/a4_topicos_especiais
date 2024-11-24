import DiasSemana from "../models/DiasSemana.js";
import DiasSemanaDB from "../database/DiasSemanaDB.js";

export default class DiasSemanaController {
    static all() {
        return DiasSemanaDB.all();
    }

    static get(id) {
        return DiasSemanaDB.get(id);
    }

    static insert(diasSemanaData) {
        const diasSemana = new DiasSemana(
            diasSemanaData.segunda,
            diasSemanaData.terca,
            diasSemanaData.quarta,
            diasSemanaData.quinta,
            diasSemanaData.sexta
        );
        return DiasSemanaDB.insert(diasSemana);
    }

    static update(diasSemanaData) {
        const diasSemana = new DiasSemana(
            diasSemanaData.segunda,
            diasSemanaData.terca,
            diasSemanaData.quarta,
            diasSemanaData.quinta,
            diasSemanaData.sexta
        );
        diasSemana.id = diasSemanaData.id;
        return DiasSemanaDB.update(diasSemana);
    }

    static delete(id) {
        return DiasSemanaDB.delete(id);
    }
}
