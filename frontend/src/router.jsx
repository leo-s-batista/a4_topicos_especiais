import { Routes, Route } from 'react-router-dom';

import { Default } from './layouts/default/index.jsx';

import { Login } from './pages/login/index.jsx';
import { Home } from './pages/home/index.jsx';

import { Paciente } from './pages/paciente/index.jsx';
import { FormularioPaciente } from './pages/paciente/form.jsx';

import { Medico } from './pages/medico/index.jsx';
import { FormularioMedico } from './pages/medico/form.jsx';

import { Funcionario } from './pages/funcionario/index.jsx';
import { FormularioFuncionario } from './pages/funcionario/form.jsx';

import { Sala } from './pages/sala/index.jsx';
import { FormularioSala } from './pages/sala/form.jsx';

import { TipoConsulta } from './pages/tipo-consulta/index.jsx';
import { FormularioTipoConsulta } from './pages/tipo-consulta/form.jsx';

import { AgendarConsulta } from './pages/agendar-consulta/index.jsx';
import { CancelarConsulta } from './pages/cancelar-consulta/index.jsx';

import RouteMiddleware from './middleware/auth.jsx';

export function CreateRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="" element={<RouteMiddleware><Default /></RouteMiddleware>} >
        <Route path="/" element={<Home />} />

        <Route path="/pacientes" element={<RouteMiddleware roles={['funcionario', 'admin', 'medico']}><Paciente /></RouteMiddleware>} />
        <Route path="/pacientes/novo" element={<RouteMiddleware roles={['funcionario', 'admin', 'medico']}><FormularioPaciente /></RouteMiddleware>} />
        <Route path="/pacientes/:id/:nome" element={<RouteMiddleware roles={['funcionario', 'admin', 'medico']}><FormularioPaciente /></RouteMiddleware>} />

        <Route path="/medicos" element={<RouteMiddleware roles={['admin']}><Medico /></RouteMiddleware>} />
        <Route path="/medicos/novo" element={<RouteMiddleware roles={['admin']}><FormularioMedico /></RouteMiddleware>} />
        <Route path="/medicos/:id/:nome" element={<RouteMiddleware roles={['admin']}><FormularioMedico /></RouteMiddleware>} />

        <Route path="/funcionarios" element={<RouteMiddleware roles={['admin']}><Funcionario /></RouteMiddleware>} />
        <Route path="/funcionarios/novo" element={<RouteMiddleware roles={['admin']}><FormularioFuncionario /></RouteMiddleware>} />
        <Route path="/funcionarios/:id/:nome" element={<RouteMiddleware roles={['admin']}><FormularioFuncionario /></RouteMiddleware>} />

        <Route path="/salas" element={<RouteMiddleware roles={['admin']}><Sala /></RouteMiddleware>} />
        <Route path="/salas/novo" element={<RouteMiddleware roles={['admin']}><FormularioSala /></RouteMiddleware>} />
        <Route path="/salas/:id" element={<RouteMiddleware roles={['admin']}><FormularioSala /></RouteMiddleware>} />

        <Route path="/tipo-consulta" element={<RouteMiddleware roles={['admin']}><TipoConsulta /></RouteMiddleware>} />
        <Route path="/tipo-consulta/novo" element={<RouteMiddleware roles={['admin']}><FormularioTipoConsulta /></RouteMiddleware>} />
        <Route path="/tipo-consulta/:id" element={<RouteMiddleware roles={['admin']}><FormularioTipoConsulta /></RouteMiddleware>} />

        <Route path="/agendar-consulta" element={<RouteMiddleware roles={['funcionario', 'admin', 'medico']}><AgendarConsulta /></RouteMiddleware>} />
        <Route path="/cancelar-consulta" element={<RouteMiddleware roles={['funcionario', 'admin']}><CancelarConsulta /></RouteMiddleware>} />
      </Route>
    </Routes>
  );
}
