import React, { useState, useEffect } from 'react';
import './Horarios.css';
import axios from 'axios';

// Objeto para asociar IDs de canchas con sus nombres
const courts = {
    '6681dbb7c62742942c281bf5': 'Baloncesto',
    '6681dc07c62742942c281bf8': 'Multiple 1',
    '6681dc0ec62742942c281bfa': 'Multiple 2',
    '6681dc13c62742942c281bfc': 'Multiple 3',
    '6681dc1fc62742942c281bfe': 'Squash',
    '6681dc2dc62742942c281c00': 'Coliseo UIS',
    '6681dc39c62742942c281c02': 'Canchas UIS Sur',
    '6681dc47c62742942c281c04': 'Tenis 1',
    '6681dc4bc62742942c281c06': 'Tenis 2',
    '6681dc5dc62742942c281c08': 'Estadio 1ero Marzo',
    '6681dc69c62742942c281c0a': 'Diamante',
    '6681dca0c62742942c281c0d': 'Voley',
    '6681dca6c62742942c281c0f': 'Arena'
};

// Objeto para asociar IDs de horarios con sus franjas horarias
const horarios = {
    '6681dcf2c62742942c281c11': '6:00 - 8:00',
    '6681dcf7c62742942c281c13': '8:00 - 10:00',
    '6681dcfcc62742942c281c15': '10:00 - 12:00',
    '6681dd01c62742942c281c17': '12:00 - 14:00',
    '6681dd05c62742942c281c19': '14:00 - 16:00',
    '6681dd09c62742942c281c1b': '16:00 - 18:00',
    '6681dd0dc62742942c281c1d': '18:00 - 20:00',
    '6681dd15c62742942c281c1f': '20:00 - 22:00'
};

function Horarios({ cancha, onClose }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [disponibilidad, setDisponibilidad] = useState({});
    

    useEffect(() => {
        if (cancha && selectedDate) {
            const fecha = selectedDate.slice(0, 10); 
            axios.get(`/disponibilidad?idcancha=${cancha}&fecha=${fecha}`)
            
                .then(response => {
                    setDisponibilidad(response.data.disponibilidad);
                })
                .catch(error => {
                    console.error('Error al obtener disponibilidad:', error);
                });
        }
    }, [cancha, selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const verificarReserva = (idHorario) => {
        if (!disponibilidad) return 'Cargando...'; // o 'Desconocido'
        return disponibilidad[idHorario] ? 'Disponible' : 'Reservada';
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Disponibilidad de {courts[cancha]}</h2>
                    <div className="date-selector">
                        <label htmlFor="fecha">Seleccionar fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={selectedDate}
                            onChange={handleDateChange}
                           
                        />
                    </div>
                    <button className="close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Franja Horaria</th>
                                <th>Disponibilidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(horarios).map(idHorario => (
                                <tr key={idHorario}>
                                    <td>{horarios[idHorario]}</td>
                                    <td>{verificarReserva(idHorario)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Horarios;
