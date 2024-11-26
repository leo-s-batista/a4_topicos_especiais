import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

import sha256 from 'crypto-js/sha256';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { api } from '../../axios.js';

export function Login() {

    localStorage.removeItem('token');

    const navigate = useNavigate();

    const [error, setError] = useState(null);


    const handleSubmit = (event) => {

        event.preventDefault();
        setError(null);

        const email = event.target[0].value;
        const senha = event.target[1].value;

        const hash = sha256(senha).toString();

        api.post(('http://localhost:4000/api/login'), { email, senha: hash }).then((response) => {
            localStorage.setItem('token', response.data);
            navigate('/')

        }).catch((error) => {
            setError(error.response.data.error);
        });

    }

    return (
        <div className="login">

            <Form className="login--form" onSubmit={handleSubmit}>
                <Form.Group className="login--form__input">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu e-mail" />
                </Form.Group>

                <Form.Group className="login--form__input">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <Button className="login--form__button" variant="success" type="submit">
                    Entrar
                </Button>

                <Alert variant="danger" show={error}>
                    {error}
                </Alert>

            </Form>


        </div>
    );
}