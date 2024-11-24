import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import slugify from 'react-slugify';

import './styles.scss';

export function Funcionario() {
    const [nome, setNome] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/funcionario').then((response) => {
            setFuncionarios(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar funcionários:', error);
        });
    }, []);

    const handleSearch = () => {
        if (nome) {
            api.get(`/funcionario/nome/${nome}`).then((response) => {
                setFuncionarios(response.data);
            }).catch((error) => {
                console.error('Erro ao buscar funcionário por nome:', error);
            });
        }
    };

    const handleEdit = (id, nome) => {
        const encondedNome = slugify(nome);
        navigate(`/funcionarios/${id}/${encondedNome}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
            api.delete(`/funcionario/${id}`).then(() => {
                setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id));
            }).catch((error) => {
                console.error('Erro ao excluir funcionário:', error);
            });
        }
    };

    return (
        <div className="funcionarios">
            <div className="funcionarios--header">
                <div className="funcionarios--header__title">
                    Funcionários
                </div>
                <div onClick={() => navigate('/funcionarios/novo')} className="funcionarios--header__new">
                    <FaPlus />
                </div>
            </div>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Procurar por Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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
                        <th>Função</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td>{funcionario.id}</td>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.funcao}</td>
                            <td>{funcionario.email}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEdit(funcionario.id, funcionario.nome)} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(funcionario.id)}>
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
