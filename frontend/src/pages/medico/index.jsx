import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import slugify from 'react-slugify';

import './styles.scss';

export function Medico() {
    const [cpf, setCpf] = useState('');
    const [medicos, setMedicos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/medico').then((response) => {
            setMedicos(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar médicos:', error);
        });
    }, []);

    const handleSearch = () => {
        if (cpf) {
            api.get(`/medico/cpf/${cpf}`).then((response) => {
                setMedicos(response.data);
            }).catch((error) => {
                console.error('Erro ao buscar médico por CPF:', error);
            });
        }
    };

    const handleEdit = (id, nome) => {
        const encondedNome = slugify(nome);
        navigate(`/medicos/${id}/${encondedNome}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este médico?')) {
            api.delete(`/medico/${id}`).then(() => {
                setMedicos(medicos.filter(medico => medico.id !== id));
            }).catch((error) => {
                console.error('Erro ao excluir médico:', error);
            });
        }
    };

    return (
        <div className="medicos">
            <div className="medicos--header">
                <div className="medicos--header__title">
                    Médicos
                </div>
                <div onClick={() => navigate('/medicos/novo')} className="medicos--header__new">
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
                <Button variant="primary" onClick={handleSearch}>
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
                        <th>CRM</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <tr key={medico.id}>
                            <td>{medico.id}</td>
                            <td>{medico.nome}</td>
                            <td>{medico.email}</td>
                            <td>{medico.cpf}</td>
                            <td>{medico.crm}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEdit(medico.id, medico.nome)} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(medico.id)}>
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