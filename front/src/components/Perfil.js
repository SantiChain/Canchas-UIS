// src/componentes/Perfil.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    codigo: '',
    email: '',
    password: ''
  });

  const codigoGuardado = localStorage.getItem('codigoEstudiante');


  useEffect(() => {
    if (!codigoGuardado || codigoGuardado === 'null') {
      alert('No se encontró sesión activa');
      navigate('/');
      return;
    }

    // Traer datos del usuario desde backend
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8087/api/auth/usuarios/${codigoGuardado}`);
        if (response.ok) {
          const data = await response.json();
          setUsuario({
            codigo: data.codigo,
            email: data.email,
            password: '' // por seguridad, no mostrar password
          });
        } else {
          console.error('No se encontró el usuario');
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    fetchUsuario();
  }, [codigoGuardado, navigate]);

  const handleEditar = () => {
    navigate('/editar', { state: usuario });
  };

  const handleEliminar = async () => {
    try {
      const response = await fetch(`http://localhost:8087/api/auth/usuarios/${codigoGuardado}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.clear();
        navigate('/');
      } else {
        alert('No se pudo eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>
      <p><strong>Código:</strong> {usuario.codigo}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <div className="perfil-buttons">
        <button onClick={handleEditar}>Editar Perfil</button>
        <button onClick={handleEliminar} className="eliminar-btn">Eliminar Cuenta</button>
      </div>
    </div>
  );
}

export default Perfil;
