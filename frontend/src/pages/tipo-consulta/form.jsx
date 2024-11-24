import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { api } from '../../axios.js';

import './styles.scss';

export function FormularioTipoConsulta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [salas, setSalas] = useState([]);
    const [formValues, setFormValues] = useState({
        descricao: '',
        duracao: '',
        salaId: '',
        diasSemanaId: null,
    });

    const [diasSemana, setDiasSemana] = useState([
        { dia: 'segunda', ativo: false, horaInicio: '', horaFim: '' },
        { dia: 'terca', ativo: false, horaInicio: '', horaFim: '' },
        { dia: 'quarta', ativo: false, horaInicio: '', horaFim: '' },
        { dia: 'quinta', ativo: false, horaInicio: '', horaFim: '' },
        { dia: 'sexta', ativo: false, horaInicio: '', horaFim: '' },
    ]);

    useEffect(() => {
        api.get('/sala').then((response) => {
            setSalas(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar salas:', error);
        });

        if (id) {
            api.get(`/tipo-consulta/${id}`).then((response) => {
                setFormValues({
                    descricao: response.data.descricao || '',
                    duracao: response.data.duracao || '',
                    salaId: response.data.salaId || '',
                    diasSemanaId: response.data.diasSemanaId || null,
                });

                if (response.data.diasSemana) {
                    setDiasSemana((prevDias) =>
                        prevDias.map((dia) => ({
                            ...dia,
                            ativo: !!response.data.diasSemana[dia.dia],
                            horaInicio: response.data.diasSemana[dia.dia]?.start || '',
                            horaFim: response.data.diasSemana[dia.dia]?.end || '',
                        }))
                    );
                }
            }).catch((error) => {
                console.error('Erro ao buscar tipo de consulta:', error);
            });
        }
    }, [id]);

    const handleDiaChange = (index, field, value) => {
        setDiasSemana((prevDias) => {
            const updatedDias = [...prevDias];
            updatedDias[index][field] = value;
            return updatedDias;
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        const diasInvalidos = diasSemana.some(
            (dia) => dia.ativo && (!dia.horaInicio || !dia.horaFim)
        );

        if (diasInvalidos) {
            alert('Por favor, preencha os horários para todos os dias ativos.');
            return;
        }

        setValidated(true);

        if (form.checkValidity()) {
            const payloadDiasSemana = diasSemana.reduce((acc, dia) => {
                if (dia.ativo) {
                    acc[dia.dia] = { start: dia.horaInicio, end: dia.horaFim };
                }
                return acc;
            }, {});

            const payload = {
                ...formValues,
                diasSemana: Object.keys(payloadDiasSemana).length > 0 ? payloadDiasSemana : null,
            };

            const request = id
                ? api.put(`/tipo-consulta/${id}`, payload)
                : api.post('/tipo-consulta', payload);

            request.then(() => {
                navigate('/tipo-consulta');
            }).catch((error) => {
                console.error('Erro ao enviar dados:', error);
            });
        }
    };

    return (
        <div className="tipo-consulta">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Descrição <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.descricao}
                        onChange={(e) => setFormValues({ ...formValues, descricao: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duração (em minutos) <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={formValues.duracao}
                        onChange={(e) => setFormValues({ ...formValues, duracao: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sala <span className="mandatory">*</span></Form.Label>
                    <Form.Select
                        required
                        value={formValues.salaId}
                        onChange={(e) => setFormValues({ ...formValues, salaId: e.target.value })}
                    >
                        <option value="">Selecione uma sala</option>
                        {salas.map((sala) => (
                            <option key={sala.id} value={sala.id}>
                                {sala.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label>Dias da Semana</Form.Label>
                    {diasSemana.map((dia, index) => (
                        <div key={dia.dia} className="flex items-center gap-x-4 mb-3">
                            <Form.Check
                                type="checkbox"
                                checked={dia.ativo}
                                onChange={(e) => handleDiaChange(index, 'ativo', e.target.checked)}
                            />
                            <span>{dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1)}</span>
                            <Form.Control
                                type="time"
                                disabled={!dia.ativo}
                                value={dia.horaInicio}
                                onChange={(e) => handleDiaChange(index, 'horaInicio', e.target.value)}
                                required={dia.ativo}
                            />
                            <span>até</span>
                            <Form.Control
                                type="time"
                                disabled={!dia.ativo}
                                value={dia.horaFim}
                                onChange={(e) => handleDiaChange(index, 'horaFim', e.target.value)}
                                required={dia.ativo}
                            />
                        </div>
                    ))}
                </Form.Group>

                <div className="flex justify-center pt-6 pb-12">
                    <Button variant="success" type="submit">
                        {id ? 'Atualizar' : 'Criar'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
