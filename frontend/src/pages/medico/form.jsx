import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { api } from '../../axios.js';
import { ErrorView } from './error.jsx';
import { useNavigate } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';

import './styles.scss';

export function FormularioMedico() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        cpf: '',
        crm: '',
        rqe: '',
        senha: '',
    });

    const [tiposConsulta, setTiposConsulta] = useState([]);
    const [selectedTiposConsulta, setSelectedTiposConsulta] = useState([]);
    const [medico, setMedico] = useState(null);


    useEffect(() => {
        api.get('/tipo-consulta')
            .then((response) => {
                setTiposConsulta(
                    response.data.map((tipo) => ({
                        value: tipo.id,
                        label: tipo.descricao,
                    }))
                );
            })
            .catch((error) => {
                console.error('Erro ao buscar tipos de consulta:', error);
            });

        if (id) {
            api.get(`/medico/${id}`)
                .then((response) => {
                    if (response.data) {
                        const medico = response.data;

                        setMedico(medico);

                        setFormValues({
                            nome: medico.nome || '',
                            email: medico.email || '',
                            cpf: medico.cpf || '',
                            crm: medico.crm || '',
                            rqe: medico.rqe || '',
                            senha: '',
                        });


                        if (medico.tiposConsulta) {
                            setSelectedTiposConsulta(
                                medico.tiposConsulta.map((tc) => ({
                                    value: tc.id,
                                    label: tc.descricao,
                                }))
                            );
                        }
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar dados do médico:', error);
                });
        }
    }, [id]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        setValidated(true);

        event.preventDefault();

        if (form.checkValidity()) {

            let senha = ''

            if (formValues.senha !== '') {
                senha = sha256(formValues.senha).toString();
            } else if (medico) {
                senha = medico.senha
            }

            const data = { ...formValues, senha }

            const payload = {
                ...data,
                tiposConsulta: selectedTiposConsulta.map((tipo) => tipo.value),
            };

            const request = id
                ? api.put(`/medico/${id}`, payload)
                : api.post('/medico', payload);

            request
                .then(() => {
                    setSent(true);
                    navigate('/medicos');
                })
                .catch((error) => {
                    console.error('Erro ao enviar dados:', error);
                    setSent(true);
                    setError(true);
                });
        }
    };

    return sent && error ? (
        <ErrorView />
    ) : (
        <div className="medico">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.nome}
                        onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>CPF <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.cpf}
                        placeholder="ex: 000.000.000-00"
                        onChange={(e) => setFormValues({ ...formValues, cpf: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>E-mail <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="email"
                        value={formValues.email}
                        placeholder="ex: email@exemplo.com"
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>CRM <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.crm}
                        onChange={(e) => setFormValues({ ...formValues, crm: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>RQE</Form.Label>
                    <Form.Control
                        type="text"
                        value={formValues.rqe}
                        onChange={(e) => setFormValues({ ...formValues, rqe: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        type="password"
                        value={formValues.senha}
                        onChange={(e) => setFormValues({ ...formValues, senha: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                        Campo obrigatório
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tipos de Consulta</Form.Label>
                    <Select
                        isMulti
                        options={tiposConsulta}
                        value={selectedTiposConsulta}
                        onChange={(selectedOptions) => setSelectedTiposConsulta(selectedOptions)}
                        placeholder="Selecione os tipos de consulta"
                    />
                </Form.Group>

                <div className="flex justify-center pt-6 pb-12">
                    <Button variant="success" type="submit">
                        {id ? 'Atualizar' : 'Enviar'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
