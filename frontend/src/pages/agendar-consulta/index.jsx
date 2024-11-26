import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import './styles.scss';

export function AgendarConsulta() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState(null);

    const [tiposConsulta, setTiposConsulta] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const [formValues, setFormValues] = useState({
        paciente: '',
        tipoConsulta: '',
        medico: '',
        data: '',
        horario: '',
        retorno: false,
        motivoConsulta: '',
    });
    const [user, setUser] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem('token')
        const user = jwtDecode(token);

        if (user) {
            setUser(user);
        }
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

        api.get('/tipo-consulta')
            .then((response) => {
                const formattedTiposConsulta = response.data.map((tipo) => ({
                    value: tipo.id,
                    label: tipo.descricao,
                }));
                setTiposConsulta(formattedTiposConsulta);
            })
            .catch((error) => {
                console.error('Erro ao buscar tipos de consulta:', error);
            });
    }, []);

    const handleSelectPaciente = (selectedPaciente) => {
        setPaciente(selectedPaciente);
        setFormValues((prev) => ({
            ...prev,
            paciente: selectedPaciente ? selectedPaciente.value : '',
        }));
        setStep(2);
    };

    const handleTipoConsultaChange = (selectedOption) => {
        const tipoConsultaId = selectedOption ? selectedOption.value : '';
        setFormValues((prev) => ({
            ...prev,
            tipoConsulta: tipoConsultaId,
            medico: '',
        }));
        setMedicos([]);
        if (tipoConsultaId) {
            api.get(`/tipo-consulta/${tipoConsultaId}/medico`)
                .then((response) => {
                    const formattedMedicos = response.data.map((medico) => ({
                        value: medico.id,
                        label: medico.nome,
                    }));
                    setMedicos(formattedMedicos);
                })
                .catch((error) => {
                    console.error('Erro ao buscar médicos:', error);
                });
        }
        setStep(3);
    };

    const handleMedicoChange = (selectedOption) => {
        setFormValues((prev) => ({
            ...prev,
            medico: selectedOption ? selectedOption.value : '',
        }));
        setStep(4);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFormValues((prev) => ({
            ...prev,
            data: selectedDate,
        }));

        if (selectedDate) {
            api.post(`/agendar-consulta/${selectedDate}/horarios`, {
                tipoConsultaId: formValues.tipoConsulta,
                medicoId: formValues.medico,
            })
                .then((response) => {
                    setHorarios(response.data);
                    setStep(5);
                })
                .catch((error) => {
                    console.error('Erro ao buscar horários:', error);
                });
        }
    };

    const handleHorarioChange = (e) => {
        setFormValues((prev) => ({
            ...prev,
            horario: e.target.value,
        }));
    };

    const handleAgendar = () => {

        let funcionarioId = null

        if (user.funcao != 2) {
            funcionarioId = user.id
        }

        const payload = {
            pacienteId: formValues.paciente,
            tipoConsultaId: formValues.tipoConsulta,
            retorno: formValues.retorno,
            motivoConsulta: formValues.motivoConsulta,
            data: `${formValues.data} ${formValues.horario}`,
            funcionarioId,
            medicoId: formValues.medico
        }

        api.post('/agendar-consulta', payload)
            .then(() => {
                alert('Agendamento realizado com sucesso!');
                navigate(`/pacientes?id=${payload.pacienteId}`);
            })
            .catch(() => {
                alert('Erro ao realizar agendamento. Verifique os dados e tente novamente.');
            });
    };


    return (
        <div className="agendar--consulta">
            <div className="agendar--consulta__title">Agendar Consulta</div>

            {step >= 1 && (
                <div className="agendar--consulta__paciente">
                    <span>Paciente:</span>
                    <Form.Group className="mb-3">
                        <Select
                            options={pacientes}
                            onChange={handleSelectPaciente}
                            value={pacientes.find((p) => p.value === formValues.paciente)}
                            placeholder="Selecione um paciente"
                        />
                    </Form.Group>
                    {formValues.paciente && (
                        <Form.Group className="mb-3" controlId="motivoConsulta">
                            <Form.Label>Motivo da Consulta</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Descreva o motivo da consulta"
                                value={formValues.motivoConsulta}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        motivoConsulta: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                    )}
                </div>
            )}

            {step >= 2 && formValues.paciente && (
                <div className="agendar--consulta__form">
                    <Form.Group className="mb-3" controlId="tipoConsulta">
                        <Form.Label>Tipo de Consulta</Form.Label>
                        <Select
                            options={tiposConsulta}
                            value={tiposConsulta.find(
                                (tipo) => tipo.value === formValues.tipoConsulta
                            )}
                            onChange={handleTipoConsultaChange}
                            placeholder="Selecione um tipo de consulta"
                        />
                    </Form.Group>
                </div>
            )}

            {step >= 3 && formValues.tipoConsulta && (
                <div className="agendar--consulta__form">
                    <Form.Group className="mb-3" controlId="medico">
                        <Form.Label>Médico</Form.Label>
                        <Select
                            options={medicos}
                            value={medicos.find((medico) => medico.value === formValues.medico)}
                            onChange={handleMedicoChange}
                            placeholder="Selecione um médico"
                            isDisabled={!formValues.tipoConsulta}
                        />
                    </Form.Group>
                </div>
            )}

            {step >= 4 && formValues.medico && (
                <div className="agendar--consulta__form">
                    <Form.Group className="mb-3" controlId="data">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            value={formValues.data}
                            onChange={handleDateChange}
                        />
                    </Form.Group>
                </div>
            )}

            {step >= 5 && formValues.data && horarios.length > 0 && (
                <div className="agendar--consulta__form">
                    <Form.Group className="mb-3" controlId="horarios">
                        <Form.Label>Horário</Form.Label>
                        {horarios.map((horario) => (
                            <Form.Check
                                key={horario}
                                type="radio"
                                label={horario}
                                value={horario}
                                name="horarios"
                                checked={formValues.horario === horario}
                                onChange={handleHorarioChange}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="retorno">
                        <Form.Label>Retorno</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Sim"
                                value={true}
                                name="retorno"
                                checked={formValues.retorno === true}
                                onChange={() =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        retorno: true,
                                    }))
                                }
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Não"
                                value={false}
                                name="retorno"
                                checked={formValues.retorno === false}
                                onChange={() =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        retorno: false,
                                    }))
                                }
                            />
                        </div>
                    </Form.Group>
                    <Button
                        variant="success"
                        onClick={handleAgendar}
                        disabled={!formValues.horario}
                    >
                        Agendar
                    </Button>
                </div>
            )}
        </div>
    );
}
