import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { api } from '../../axios.js';
import { ErrorView } from './error.jsx';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

export function FormularioPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    cpf: '',
    n_plano_saude: '',
    sexo: '',
    data_nascimento: '',
    endereco: '',
    telefone: '',
  });

  useEffect(() => {
    if (id) {
      api.get(`/paciente/${id}`).then((response) => {
        if (response.data) {
          const paciente = response.data;

          const formattedDate = paciente.data_nascimento
            ? new Date(paciente.data_nascimento).toISOString().split('T')[0]
            : '';

          setFormValues({
            nome: paciente.nome || '',
            email: paciente.email || '',
            cpf: paciente.cpf || '',
            n_plano_saude: paciente.n_plano_saude || '',
            sexo: paciente.sexo || '',
            data_nascimento: formattedDate,
            endereco: paciente.endereco || '',
            telefone: paciente.telefone || ''
          });
        }
      }).catch((error) => {
        console.error('Erro ao buscar dados do paciente:', error);
      });
    }
  }, [id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    setValidated(true);

    event.preventDefault();

    if (form.checkValidity()) {
      const request = id
        ? api.put(`/paciente/${id}`, formValues)
        : api.post('/paciente', formValues);

      request.then((response) => {
        setSent(true);
        navigate('/pacientes');
      }).catch((error) => {
        console.error('Erro ao enviar dados:', error);
        setSent(true);
        setError(true);
      });
    }
  };

  return (
    sent && error ? <ErrorView /> :
      <div className="paciente">
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
            <Form.Label>Número do Plano de Saúde</Form.Label>
            <Form.Control
              type="text"
              value={formValues.n_plano_saude}
              onChange={(e) => setFormValues({ ...formValues, n_plano_saude: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sexo <span className="mandatory">*</span></Form.Label>
            <Form.Control
              as="select"
              required
              value={formValues.sexo}
              onChange={(e) => setFormValues({ ...formValues, sexo: e.target.value })}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Indefinido">Indefinido</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Campo obrigatório
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Nascimento <span className="mandatory">*</span></Form.Label>
            <Form.Control
              required
              type="date"
              value={formValues.data_nascimento}
              onChange={(e) => setFormValues({ ...formValues, data_nascimento: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Campo obrigatório
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              value={formValues.endereco}
              onChange={(e) => setFormValues({ ...formValues, endereco: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              value={formValues.telefone}
              placeholder="ex: (00) 90000-0000"
              onChange={(e) => setFormValues({ ...formValues, telefone: e.target.value })}
            />
          </Form.Group>
          <div className="flex justify-center pt-6 pb-12">
            <Button variant="success" type="submit">{id ? 'Atualizar' : 'Enviar'}</Button>
          </div>
        </Form>
      </div>
  );
}