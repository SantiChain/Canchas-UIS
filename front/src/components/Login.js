import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [codigo, setCodigo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8087/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo, password }),
        });

        const data = await response.json();

        // 🔍 Agregado para ver qué responde el backend
        console.log("🔍 response.ok:", response.ok);
        console.log("🔍 response.status:", response.status);
        console.log("🔍 data:", data);

        if (response.ok) {
            localStorage.setItem('token', data.token || '');
            localStorage.setItem('codigoEstudiante', data.codigo); // Si estás usando token
            navigate('/v1/mapa');
        } else {
            setError(data.message || 'Inicio de sesión fallido');
        }
    } catch (err) {
        console.error('🔴 Error de conexión:', err);
        setError('Error de conexión');
    }
};

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Código Estudiante"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
