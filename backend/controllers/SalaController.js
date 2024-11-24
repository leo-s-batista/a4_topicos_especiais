import Sala from '../models/Sala.js';
import SalaDB from '../database/SalaDB.js';

export default class SalaController {
    static all() {
        return SalaDB.all();
    }

    static get(id) {
        return SalaDB.get(id);
    }

    static insert(salaData) {
        const sala = new Sala(salaData.nome);
        return SalaDB.insert(sala);
    }

    static update(salaData) {
        const sala = new Sala(salaData.nome);
        sala.id = salaData.id;
        return SalaDB.update(sala);
    }

    static delete(id) {
        return SalaDB.delete(id);
    }
}
