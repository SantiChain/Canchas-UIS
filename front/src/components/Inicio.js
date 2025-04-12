import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css'; // (si quieres darle estilo más adelante)

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <h1>Bienvenido</h1>
      <div className="botones-inicio">
        <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        <button onClick={() => navigate('/register')}>Registrarse</button>
      </div>
    </div>
  );
}

export default Inicio;
