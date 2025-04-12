import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // puedes usar el mismo estilo

function Edit() {
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8087/api/auth/usuarios/${codigo}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const text = await response.text();

            if (response.ok) {
                setMensaje('Usuario actualizado con éxito');
                setTimeout(() => navigate('/inicio'), 2000);
            } else {
                setMensaje(text || 'Error al actualizar');
            }
        } catch (err) {
            console.error(err);
            setMensaje('Error de conexión');
        }
    };

    return (
        <div className="register-container">
            <h2>Editar Usuario</h2>
            {mensaje && <p className="error">{mensaje}</p>}
            <form onSubmit={handleEdit}>
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código Estudiante" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nuevo Correo" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nueva Contraseña" required />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default Edit;
