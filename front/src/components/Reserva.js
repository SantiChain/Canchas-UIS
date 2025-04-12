import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reserva.css'; // Estilos CSS según necesidad

const horarios = [
  { id: '6681dcf2c62742942c281c11', time: '6:00 - 8:00' },
  { id: '6681dcf7c62742942c281c13', time: '8:00 - 10:00' },
  { id: '6681dcfcc62742942c281c15', time: '10:00 - 12:00' },
  { id: '6681dd01c62742942c281c17', time: '12:00 - 14:00' },
  { id: '6681dd05c62742942c281c19', time: '14:00 - 16:00' },
  { id: '6681dd09c62742942c281c1b', time: '16:00 - 18:00' },
  { id: '6681dd0dc62742942c281c1d', time: '18:00 - 20:00' },
  { id: '6681dd15c62742942c281c1f', time: '20:00 - 22:00' }
];

const courts = [
  { id: '6681dbb7c62742942c281bf5', name: 'Baloncesto' },
  { id: '6681dc07c62742942c281bf8', name: 'Multiple 1' },
  { id: '6681dc0ec62742942c281bfa', name: 'Multiple 2' },
  { id: '6681dc13c62742942c281bfc', name: 'Multiple 3' },
  { id: '6681dc1fc62742942c281bfe', name: 'Squash' },
  { id: '6681dc2dc62742942c281c00', name: 'Coliseo UIS' },
  { id: '6681dc39c62742942c281c02', name: 'Canchas UIS Sur' },
  { id: '6681dc47c62742942c281c04', name: 'Tenis 1' },
  { id: '6681dc4bc62742942c281c06', name: 'Tenis 2' },
  { id: '6681dc5dc62742942c281c08', name: 'Estadio 1ero Marzo' },
  { id: '6681dc69c62742942c281c0a', name: 'Diamante' },
  { id: '6681dca0c62742942c281c0d', name: 'Voley' },
  { id: '6681dca6c62742942c281c0f', name: 'Arena' }
];

function Reserva() {
  const [codigoEstudiante, setCodigoEstudiante] = useState('');
  const [idCancha, setIdCancha] = useState('');
  const [fecha, setFecha] = useState('');
  const [idHorario, setIdHorario] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Cargar código del login desde localStorage
  useEffect(() => {
    const codigoGuardado = localStorage.getItem('codigoEstudiante');
    if (codigoGuardado) {
      setCodigoEstudiante(codigoGuardado);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/reservations', {
        codigoestudiante: codigoEstudiante,
        idcancha: idCancha,
        fecha: fecha,
        idhorario: idHorario
      });
      console.log(response.data);
      setShowSuccessModal(true);
      setShowErrorModal(false);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      setShowSuccessModal(false);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="reserva-container">
      <h2>Realizar Reserva</h2>

      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reserva hecha exitosamente</h3>
            <button onClick={() => setShowSuccessModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reserva rechazada</h3>
            <button onClick={() => setShowErrorModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Código de Estudiante:</label>
        <input type="text" value={codigoEstudiante} readOnly />

        <label htmlFor="idCancha">Cancha:</label>
        <select
          id="idCancha"
          value={idCancha}
          onChange={(e) => setIdCancha(e.target.value)}
          required
        >
          <option value="">Seleccione una cancha</option>
          {courts.map((court) => (
            <option key={court.id} value={court.id}>
              {court.name}
            </option>
          ))}
        </select>

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min="2025-01-01"
          max="2025-12-31"
          required
        />

        <label htmlFor="idHorario">Franja Horaria a Reservar:</label>
        <select
          id="idHorario"
          value={idHorario}
          onChange={(e) => setIdHorario(e.target.value)}
          required
        >
          <option value="">Seleccione un horario</option>
          {horarios.map((horario) => (
            <option key={horario.id} value={horario.id}>
              {horario.time}
            </option>
          ))}
        </select>

        <button type="submit">Crear Reserva</button>
      </form>
    </div>
  );
}

export default Reserva;

