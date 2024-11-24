import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

export function FormularioSala() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState({ nome: '' });

    useEffect(() => {
        if (id) {
            api.get(`/sala/${id}`).then((response) => {
                if (response.data) {
                    setFormValues({ nome: response.data.nome || '' });
                }
            }).catch((error) => {
                console.error('Erro ao buscar dados da sala:', error);
            });
        }
    }, [id]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);

        if (form.checkValidity()) {
            const request = id
                ? api.put(`/sala/${id}`, formValues)
                : api.post('/sala', formValues);

            request.then(() => {
                navigate('/salas');
            }).catch((error) => {
                console.error('Erro ao enviar dados:', error);
            });
        }
    };

    return (
        <div className="sala">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.nome}
                        onChange={(e) => setFormValues({ nome: e.target.value })}
                    />
                </Form.Group>
                <div className="flex justify-center pt-6 pb-12">
                    <Button variant="success" type="submit">{id ? 'Atualizar' : 'Enviar'}</Button>
                </div>
            </Form>
        </div>
    );
}
