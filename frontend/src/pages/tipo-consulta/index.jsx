import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { api } from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import './styles.scss';

export function TipoConsulta() {
    const [tiposConsulta, setTiposConsulta] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/tipo-consulta').then((response) => {
            setTiposConsulta(response.data);
        }).catch((error) => {
            console.error('Erro ao buscar tipos de consulta:', error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/tipo-consulta/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este tipo de consulta?')) {
            api.delete(`/tipo-consulta/${id}`).then(() => {
                setTiposConsulta(tiposConsulta.filter(tipoConsulta => tipoConsulta.id !== id));
            }).catch((error) => {
                console.error('Erro ao excluir tipo de consulta:', error);
            });
        }
    };

    return (
        <div className="tipo-consulta">
            <div className="tipo-consulta--header">
                <div className="tipo-consulta--header__title">
                    Tipos de Consulta
                </div>
                <div onClick={() => navigate('/tipo-consulta/novo')} className="tipo-consulta--header__new">
                    <FaPlus />
                </div>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Duração</th>
                        <th>Sala</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposConsulta.map((tipoConsulta) => (
                        <tr key={tipoConsulta.id}>
                            <td>{tipoConsulta.id}</td>
                            <td>{tipoConsulta.descricao}</td>
                            <td>{tipoConsulta.duracao} minutos</td>
                            <td>{tipoConsulta.salaId}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEdit(tipoConsulta.id)} className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(tipoConsulta.id)}>
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
