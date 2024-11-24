import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import './styles.scss';

export function Sala() {
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/sala').then((response) => {
            setSalas(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar salas:', error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/salas/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
            api.delete(`/sala/${id}`).then(() => {
                setSalas(salas.filter(sala => sala.id !== id));
            }).catch((error) => {
                console.error('Erro ao excluir sala:', error);
            });
        }
    };

    return (
        <div className="salas">
            <div className="salas--header">
                <div className="salas--header__title">Salas</div>
                <div onClick={() => navigate('/salas/novo')} className="salas--header__new">
                    <FaPlus />
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {salas.map((sala) => (
                        <tr key={sala.id}>
                            <td>{sala.id}</td>
                            <td>{sala.nome}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEdit(sala.id)} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(sala.id)}>
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
