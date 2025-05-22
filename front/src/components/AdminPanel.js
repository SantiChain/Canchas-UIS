import React, { useEffect, useState } from 'react';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState('');
    const [canchas, setCanchas] = useState({});
    const [horarios, setHorarios] = useState({});
    const navigate = useNavigate();

    const codigo = localStorage.getItem('codigoEstudiante');
    const esAdmin = codigo === "2200"; // Solo este código es admin

    // Función para obtener el nombre de la cancha basado en su ID
    const obtenerNombreCancha = (idCancha) => {
        // Comprobamos si tenemos el nombre de la cancha en nuestro objeto
        const nombreCancha = canchas[idCancha];
        // Si lo tenemos, lo devolvemos, si no, mostramos el ID acortado
        return nombreCancha || `Cancha ${idCancha.substring(0, 6)}...`;
    };
    
    // Función para obtener el horario en formato legible
    const obtenerHorarioLegible = (idHorario) => {
        // Comprobamos si tenemos el rango del horario en nuestro objeto
        const rangoHorario = horarios[idHorario];
        if (rangoHorario) {
            // Convertimos el rango (como "8") a un formato de horario (como "8:00 - 10:00")
            const horaInicio = parseInt(rangoHorario);
            const horaFin = horaInicio + 2; // Asumimos que cada franja es de 2 horas
            return `${horaInicio}:00 - ${horaFin}:00`;
        }
        // Si no tenemos el rango, mostramos el ID acortado
        return `Horario ${idHorario.substring(0, 6)}...`;
    };

    useEffect(() => {
        // Limpiar errores al iniciar
        setError('');
        
        // Cargar todas las reservas
        fetch("http://localhost:8087/reservations/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener reservas");
                }
                return response.json();
            })
            .then((data) => setReservas(data))
            .catch((err) => {
                console.error("❌ Error:", err);
                setError("Error al cargar las reservas. Por favor, intenta más tarde.");
            });
            
        // Cargar información de canchas
        fetch("http://localhost:8087/api/cancha")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar canchas");
                return response.json();
            })
            .then(data => {
                // Obtener el array de canchas de la respuesta
                const canchasArray = data.cancha || [];
                
                
                // Convertir el array a un objeto con id como clave y nombre como valor
                const canchasObj = {};
                canchasArray.forEach(cancha => {
                    // Usar "id" en lugar de "_id" según la estructura de datos mostrada
                    canchasObj[cancha.id] = cancha.nombre;
                });
                setCanchas(canchasObj);
            })
            .catch(err => {
                console.error("Error cargando canchas:", err);
                setError(prev => prev ? `${prev} Error cargando datos de canchas.` : "Error cargando datos de canchas.");
            });
            
        // Cargar información de horarios
        fetch("http://localhost:8087/horarios")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar horarios");
                return response.json();
            })
            .then(data => {
                
                
                // Convertir el array a un objeto con id como clave y rango como valor
                const horariosObj = {};
                data.forEach(horario => {
                    // Usar "id" en lugar de "_id" según la estructura de datos mostrada
                    horariosObj[horario.id] = horario.rango;
                });
                setHorarios(horariosObj);
            })
            .catch(err => {
                console.error("Error cargando horarios:", err);
                setError(prev => prev ? `${prev} Error cargando datos de horarios.` : "Error cargando datos de horarios.");
            });
    }, []);

   const eliminarReserva = async (reserva) => {
    const confirmacion = window.confirm("¿Seguro que deseas eliminar esta reserva?");
    if (!confirmacion) return;

    try {
        const response = await fetch(`http://localhost:8087/reservations/${reserva.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setReservas(prev => prev.filter(r => r.id !== reserva.id));
            alert("Reserva eliminada correctamente");
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "No se pudo eliminar"}`);
        }
    } catch (error) {
        alert("Error de conexión");
    }
};

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "";
        const fecha = new Date(fechaStr);
        return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!esAdmin) {
        return (
            <div className="admin-panel">
                <div className="no-auth-container">
                    <h2>No autorizado</h2>
                    <p>Solo el administrador puede acceder a este panel.</p>
                    <button className="volver-btn" onClick={() => navigate('/v1/mapa')}>Volver al mapa</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="header">
                <h1>Panel de Administrador</h1>
                <button className="volver-btn" onClick={() => navigate('/v1/mapa')}>
                    Volver al mapa
                </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="reservas-container">
                <h2>Listado de Reservas</h2>
                {reservas.length === 0 ? (
                    <p className="no-reservas">No hay reservas registradas</p>
                ) : (
                    <div className="reserva-grid">
                        {reservas.map((reserva, index) => (
                            <div key={index} className="reserva-card">
                                <div className="reserva-header">
                                    <span className="reserva-id">#{index + 1}</span>
                                    <span className="fecha-badge">{formatearFecha(reserva.fecha)}</span>
                                </div>
                                <div className="reserva-body">
                                    <div className="info-row">
                                        <span className="info-label">Cancha:</span>
                                        <span className="info-value">{obtenerNombreCancha(reserva.idcancha)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Horario:</span>
                                        <span className="info-value">{obtenerHorarioLegible(reserva.idhorario)}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Estudiante:</span>
                                        <span className="info-value code">{reserva.codigoestudiante}</span>
                                    </div>
                                </div>
                                <button 
                                    className="eliminar-btn" 
                                    onClick={() => eliminarReserva(reserva)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;