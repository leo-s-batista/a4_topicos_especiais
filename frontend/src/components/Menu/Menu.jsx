import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

export function Menu() {

  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token);

    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <header>
      <Navbar expand="lg" className="bg-green-primary">
        <Navbar.Brand>
          <Link to="/">
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav>

            <NavDropdown title="Funções Fundamentais" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/agendar-consulta">
                Agendar Consulta
              </NavDropdown.Item>
              {user.funcao != 2 && (
                <NavDropdown.Item href="/cancelar-consulta">
                  Cancelar Consulta
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <NavDropdown title="Funções Básicas" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/pacientes">
                Pacientes
              </NavDropdown.Item>
              {user.funcao == 1 && (
                <>
                  <NavDropdown.Item href="/funcionarios">
                    Funcionários
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/medicos">
                    Médicos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tipo-consulta">
                    Tipos de Consulta
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/salas">
                    Salas
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link href="/login">
              Sair
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}