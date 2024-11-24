import { Routes, Route } from 'react-router-dom';

import { Default } from './layouts/default/index.jsx';
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

export function CreateRouter() {
  return (
    <Routes>
      <Route path="" element={<Default />} >
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Paciente />} />
        <Route path="/pacientes/novo" element={<FormularioPaciente />} />
        <Route path="/pacientes/:id/:nome" element={<FormularioPaciente />} />

        <Route path="/medicos" element={<Medico />} />
        <Route path="/medicos/novo" element={<FormularioMedico />} />
        <Route path="/medicos/:id/:nome" element={<FormularioMedico />} />

        <Route path="/funcionarios" element={<Funcionario />} />
        <Route path="/funcionarios/novo" element={<FormularioFuncionario />} />
        <Route path="/funcionarios/:id/:nome" element={<FormularioFuncionario />} />

        <Route path="/salas" element={<Sala />} />
        <Route path="/salas/novo" element={<FormularioSala />} />
        <Route path="/salas/:id" element={<FormularioSala />} />

        <Route path="/tipo-consulta" element={<TipoConsulta />} />
        <Route path="/tipo-consulta/novo" element={<FormularioTipoConsulta />} />
        <Route path="/tipo-consulta/:id" element={<FormularioTipoConsulta />} />

        <Route path="/agendar-consulta" element={<AgendarConsulta />} />
        <Route path="/cancelar-consulta" element={<CancelarConsulta />} />
      </Route>
    </Routes>
  );
}