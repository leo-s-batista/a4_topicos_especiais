import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../axios.js';

export function CancelarConsulta() {
    const [step, setStep] = useState(1);
    const [pacientes, setPacientes] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);

    const [formValues, setFormValues] = useState({
        paciente: '',
        agendamento: '',
        motivo: '',
    });

    useEffect(() => {
        api.get('/paciente')
            .then((response) => {
                const formattedPacientes = response.data.map((p) => ({
                    value: p.id,
                    label: `${p.cpf} - ${p.nome}`,
                }));
                setPacientes(formattedPacientes);
            })
            .catch((error) => {
                console.error('Erro ao buscar pacientes:', error);
            });
    }, []);

    const handleSelectPaciente = (selectedPaciente) => {
        setFormValues((prev) => ({
            ...prev,
            paciente: selectedPaciente ? selectedPaciente.value : '',
        }));
        if (selectedPaciente) {
            api.get(`/agendamento/paciente/${selectedPaciente.value}`)
                .then((response) => {
                    const formattedAgendamentos = response.data.map((a) => ({
                        value: a.id,
                        label: `${new Date(a.data).toLocaleString('pt-BR')} - ${a.nomeTipoConsulta} - ${a.nomeMedico}`,
                    }));
                    setAgendamentos(formattedAgendamentos);
                    setStep(2);
                })
                .catch((error) => {
                    console.error('Erro ao buscar agendamentos:', error);
                });
        } else {
            setStep(1);
        }
    };

    const handleSelectAgendamento = (selectedAgendamento) => {
        setFormValues((prev) => ({
            ...prev,
            agendamento: selectedAgendamento ? selectedAgendamento.value : '',
        }));
    };

    const handleCancelar = () => {
        const payload = {
            agendamentoId: formValues.agendamento,
            funcionarioId: 1,
            motivo: formValues.motivo,
        };

        api.post('/cancelar-agendamento', payload)
            .then(() => {
                alert('Agendamento cancelado com sucesso!');
                setFormValues({ paciente: '', agendamento: '', motivo: '' });
                setStep(1);
            })
            .catch(() => {
                alert('Erro ao cancelar o agendamento. Tente novamente.');
            });
    };

    return (
        <div className="cancelar--agendamento">
            <div className="cancelar--agendamento__title">Cancelar Agendamento</div>

            {step >= 1 && (
                <div className="cancelar--agendamento__paciente">
                    <span>Paciente:</span>
                    <Form.Group className="mb-3">
                        <Select
                            options={pacientes}
                            onChange={handleSelectPaciente}
                            value={pacientes.find((p) => p.value === formValues.paciente)}
                            placeholder="Selecione um paciente"
                        />
                    </Form.Group>
                </div>
            )}

            {step >= 2 && formValues.paciente && agendamentos.length > 0 && (
                <div className="cancelar--agendamento__form">
                    <Form.Group className="mb-3" controlId="agendamentos">
                        <Form.Label>Agendamento</Form.Label>
                        <Select
                            options={agendamentos}
                            onChange={handleSelectAgendamento}
                            value={agendamentos.find((a) => a.value === formValues.agendamento)}
                            placeholder="Selecione um agendamento"
                        />
                    </Form.Group>
                    {formValues.agendamento && (
                        <Form.Group className="mb-3" controlId="motivo">
                            <Form.Label>Motivo do Cancelamento</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Descreva o motivo do cancelamento"
                                value={formValues.motivo}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        motivo: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                    )}
                    <Button
                        variant="danger"
                        onClick={handleCancelar}
                        disabled={!formValues.agendamento || !formValues.motivo}
                    >
                        Cancelar Agendamento
                    </Button>
                </div>
            )}
        </div>
    );
}
