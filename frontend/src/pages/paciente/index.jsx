import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import slugify from 'react-slugify';

export function Paciente() {
  const [cpf, setCpf] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/paciente').then((response) => {
      setPacientes(response.data);
    }).catch((error) => {
      console.error('Erro ao buscar pacientes:', error);
    });
  }, []);

  const handleSearch = () => {

    if (cpf) {
      api.get(`/paciente/cpf/${cpf}`).then((response) => {
        setPacientes(response.data);
      }).catch((error) => {
        console.error('Erro ao buscar paciente por CPF:', error);
      });
    }

  };

  const handleEdit = (id, nome) => {
    const encondedNome = slugify(nome);
    navigate(`/pacientes/${id}/${encondedNome}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      api.delete(`/paciente/${id}`).then(() => {
        setPacientes(pacientes.filter(paciente => paciente.id !== id));
      }).catch((error) => {
        console.error('Erro ao excluir paciente:', error);
      });
    }
  };

  return (
    <div className="pacientes">
      <div className="pacientes--header">
        <div className="pacientes--header__title">
          Pacientes
        </div>
        <div onClick={() => navigate('/pacientes/novo')} className="pacientes--header__new">
          <FaPlus />
        </div>
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Procurar por CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Button variant="success" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </InputGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nome}</td>
              <td>{paciente.email}</td>
              <td>{paciente.cpf}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(paciente.id, paciente.nome)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(paciente.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}