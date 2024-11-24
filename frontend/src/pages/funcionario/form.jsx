import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

export function FormularioFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState({
        nome: '',
        funcao: '',
        email: '',
        senha: '',
        avatar: '',
    });

    useEffect(() => {
        if (id) {
            api.get(`/funcionario/${id}`).then((response) => {
                if (response.data) {
                    const funcionario = response.data;

                    setFormValues({
                        nome: funcionario.nome || '',
                        funcao: funcionario.funcao || '',
                        email: funcionario.email || '',
                        senha: funcionario.senha || '',
                        avatar: funcionario.avatar || ''
                    });
                }
            }).catch((error) => {
                console.error('Erro ao buscar dados do funcionário:', error);
            });
        }
    }, [id]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);

        if (form.checkValidity()) {
            const request = id
                ? api.put(`/funcionario/${id}`, formValues)
                : api.post('/funcionario', formValues);

            request.then(() => {
                navigate('/funcionarios');
            }).catch((error) => {
                console.error('Erro ao enviar dados:', error);
            });
        }
    };

    return (
        <div className="funcionario">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.nome}
                        onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Função <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.funcao}
                        onChange={(e) => setFormValues({ ...formValues, funcao: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="email"
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha <span className="mandatory">*</span></Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={formValues.senha}
                        onChange={(e) => setFormValues({ ...formValues, senha: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        value={formValues.avatar}
                        onChange={(e) => setFormValues({ ...formValues, avatar: e.target.value })}
                    />
                </Form.Group>
                <div className="flex justify-center pt-6 pb-12">
                    <Button variant="success" type="submit">{id ? 'Atualizar' : 'Enviar'}</Button>
                </div>
            </Form>
        </div>
    );
}
