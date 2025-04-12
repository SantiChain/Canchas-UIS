import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8087/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo, email, password }),
            });

            const text = await response.text();

            if (response.ok) {
                navigate('/inicio');
            } else {
                setError(text || 'Registro fallido');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código Estudiante" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
export default Register;
