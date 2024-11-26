import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import PacienteController from './controllers/PacienteController.js';
import MedicoController from './controllers/MedicoController.js';
import FuncionarioController from './controllers/FuncionarioController.js';
import SalaController from './controllers/SalaController.js';
import TipoConsultaController from './controllers/TipoConsultaController.js';
import DiasSemanaController from './controllers/DiasSemanaController.js';
import AgendamentoController from './controllers/AgendamentoController.js';
import LoginController from './controllers/LoginController.js';


const app = express();
const api = express.Router();

app.use(cors());

app.use(express.json());

api.get('/paciente', (req, res) => {
    PacienteController.all().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/paciente/:id', (req, res) => {
    PacienteController.get(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
api.get('/paciente/cpf/:cpf', (req, res) => {
    PacienteController.search(req.params.cpf).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.post('/paciente', (req, res) => {
    PacienteController.insert(req.body).then((result) => {
        res.json({ insertId: result });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.put('/paciente/:id', (req, res) => {
    const pacienteData = { ...req.body, id: req.params.id };
    PacienteController.update(pacienteData).then(() => {
        res.json({ message: 'Paciente atualizado com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.delete('/paciente/:id', (req, res) => {
    PacienteController.delete(req.params.id).then(() => {
        res.json({ message: 'Paciente excluído com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/medico', (req, res) => {
    MedicoController.all().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/medico/:id', (req, res) => {
    MedicoController.get(req.params.id).then(async (result) => {

        result = result.toJSON();

        const tiposConsulta = await TipoConsultaController.getByMedico(result.id);

        result.tiposConsulta = []

        for (const tipoConsulta of tiposConsulta) {
            result.tiposConsulta.push(tipoConsulta.toJSON());
        }


        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/medico/cpf/:cpf', (req, res) => {
    MedicoController.search(req.params.cpf).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.post('/medico', (req, res) => {
    MedicoController.insert(req.body).then((result) => {
        res.json({ insertId: result });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.put('/medico/:id', (req, res) => {
    const medicoData = { ...req.body, id: req.params.id };
    MedicoController.update(medicoData).then(() => {
        res.json({ message: 'Médico atualizado com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.delete('/medico/:id', (req, res) => {
    MedicoController.delete(req.params.id).then(() => {
        res.json({ message: 'Médico excluído com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/funcionario', (req, res) => {
    FuncionarioController.all().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/funcionario/:id', (req, res) => {
    FuncionarioController.get(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/funcionario/nome/:nome', (req, res) => {
    FuncionarioController.search(req.params.nome).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.post('/funcionario', (req, res) => {
    FuncionarioController.insert(req.body).then((result) => {
        res.json({ insertId: result });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.put('/funcionario/:id', (req, res) => {
    const funcionarioData = { ...req.body, id: req.params.id };
    FuncionarioController.update(funcionarioData).then(() => {
        res.json({ message: 'Funcionário atualizado com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.delete('/funcionario/:id', (req, res) => {
    FuncionarioController.delete(req.params.id).then(() => {
        res.json({ message: 'Funcionário excluído com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/sala', (req, res) => {
    SalaController.all().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/sala/:id', (req, res) => {
    SalaController.get(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.post('/sala', (req, res) => {
    SalaController.insert(req.body).then((result) => {
        res.json({ insertId: result });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.put('/sala/:id', (req, res) => {
    const salaData = { ...req.body, id: req.params.id };
    SalaController.update(salaData).then(() => {
        res.json({ message: 'Sala atualizada com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.delete('/sala/:id', (req, res) => {
    SalaController.delete(req.params.id).then(() => {
        res.json({ message: 'Sala excluída com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/tipo-consulta', (req, res) => {
    TipoConsultaController.all().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/tipo-consulta/:id', async (req, res) => {
    TipoConsultaController.get(req.params.id).then(async (result) => {


        const diasSemana = await DiasSemanaController.get(result.diasSemanaId);

        result.diasSemana = diasSemana.toJSON();

        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.post('/tipo-consulta', async (req, res) => {

    const payload = req.body

    if (payload.diasSemana) {
        await DiasSemanaController.insert(payload.diasSemana).then((result) => {
            payload.diasSemanaId = result
        }).catch((error) => {
            res.status(500).json({ error: error.message });
        })
    }

    TipoConsultaController.insert(req.body).then((result) => {
        res.json({ insertId: result });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.put('/tipo-consulta/:id', async (req, res) => {
    const payload = { ...req.body, id: req.params.id };

    try {
        if (payload.diasSemana) {
            if (payload.diasSemanaId) {
                await DiasSemanaController.update({
                    id: payload.diasSemanaId,
                    ...payload.diasSemana,
                });
            } else {
                const diasSemanaId = await DiasSemanaController.insert(payload.diasSemana);
                payload.diasSemanaId = diasSemanaId;
            }
        }

        await TipoConsultaController.update(payload);
        res.json({ message: 'Tipo de consulta atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


api.delete('/tipo-consulta/:id', (req, res) => {
    TipoConsultaController.delete(req.params.id).then(() => {
        res.json({ message: 'Tipo de consulta excluído com sucesso' });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

api.get('/tipo-consulta/:id/medico', (req, res) => {
    TipoConsultaController.getMedicosByTipoConsulta(req.params.id).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
})

api.post('/agendar-consulta/:data/horarios', (req, res) => {
    const { data } = req.params;
    const { tipoConsultaId, medicoId } = req.body;

    AgendamentoController.getHorariosDisponiveis(data, tipoConsultaId, medicoId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
})

api.post('/agendar-consulta', (req, res) => {
    const { pacienteId, tipoConsultaId, retorno, motivoConsulta, data, funcionarioId, medicoId } = req.body;

    AgendamentoController.create({
        pacienteId,
        tipoConsultaId,
        status: 1,
        retorno: retorno ? 1 : 0,
        motivoConsulta,
        data,
        dataAgendamento: new Date(),
        funcionarioId,
        medicoId
    })
        .then((result) => {
            res.status(201).json({ message: 'Agendamento realizado com sucesso!', id: result });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});


api.get('/agendamento/paciente/:id', (req, res) => {
    AgendamentoController.getByPaciente(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
})

api.post('/cancelar-agendamento', (req, res) => {
    const { agendamentoId, funcionarioId, motivo, } = req.body;

    AgendamentoController.cancelarAgendamento(agendamentoId, motivo, funcionarioId)
        .then(() => res.json({ message: 'Agendamento cancelado com sucesso!' }))
        .catch((error) => res.status(500).json({ error: error.message }));
});

api.post('/login', (req, res) => {
    const { email, senha } = req.body;

    LoginController.login(email, senha)
        .then((result) => res.json(result))
        .catch((error) => res.status(401).json({ error: error.message }));
})


app.use('/api', api);

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});