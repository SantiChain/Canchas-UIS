import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Mapa from './components/Mapa';
import Reserva from './components/Reserva';
import Horarios from './components/Horarios';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import Edit from './components/Edit';
import EliminarReserva from './components/EliminarReserva';
import AdminPanel from './components/AdminPanel';


function AppContent() {
    const location = useLocation();
    const hideNavbarOn = ['/login', '/register'];

    return (
        <div className="App">
            {!hideNavbarOn.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" />} /> {/* ← Cambio aquí */}
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/v1/reservations" element={<Reserva />} />
                <Route path="/v1/disponibilidad" element={<Horarios />} />
                <Route path="/v1/mapa" element={<Mapa />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editar" element={<Edit />} />
                <Route path="/v1/eliminar" element={<EliminarReserva />} />
                <Route path="/admin" element={<AdminPanel />} />

            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
