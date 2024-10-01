import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Remito from './components/Remito'; 
import Inicio from './components/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas anidadas para el Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="" element={<Inicio />} /> {/* Componente de Inicio */}
          <Route path="remito" element={<Remito />} /> {/* Componente de remito */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


