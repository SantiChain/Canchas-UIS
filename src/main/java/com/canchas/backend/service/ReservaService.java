package com.canchas.backend.service;

import com.canchas.backend.model.Reserva;
import com.canchas.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva crearReserva(Reserva reserva) throws Exception {
        List<Reserva> existente = reservaRepository.findByIdcanchaAndFechaAndIdhorario(
                reserva.getIdcancha(), reserva.getFecha(), reserva.getIdhorario()
        );

        if (!existente.isEmpty()) {
            throw new Exception("La cancha no está disponible en este horario.");
        }

        return reservaRepository.save(reserva);
    }
}
