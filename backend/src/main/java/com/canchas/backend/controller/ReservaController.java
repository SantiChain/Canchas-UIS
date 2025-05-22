package com.canchas.backend.controller;

import com.canchas.backend.model.Reserva;
import com.canchas.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.bson.types.ObjectId;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @PostMapping
    public Reserva crearReserva(@RequestBody Map<String, Object> request) {
        String idcancha = (String) request.get("idcancha");
        String idhorario = (String) request.get("idhorario");
        String codigoestudiante = (String) request.get("codigoestudiante");
        Date fecha;

        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            fecha = formatter.parse((String) request.get("fecha"));
        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Formato de fecha inválido. Usa yyyy-MM-dd.");
        }

        List<Reserva> reservaExistente = reservaRepository.findByIdcanchaAndFechaAndIdhorario(idcancha, fecha, idhorario);
        if (!reservaExistente.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La cancha ya está reservada para ese día y horario.");
        }

        Reserva nueva = new Reserva();
        nueva.setIdcancha(idcancha);
        nueva.setIdhorario(idhorario);
        nueva.setCodigoestudiante(codigoestudiante);
        nueva.setFecha(fecha);

        return reservaRepository.save(nueva);
    }

@DeleteMapping
public void cancelarReserva(@RequestBody Map<String, String> body) {
    String idcancha = body.get("idcancha");
    String idhorario = body.get("idhorario");
    String fecha = body.get("fecha");

    Date fechaParsed;
    try {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        fechaParsed = formatter.parse(fecha);
    } catch (ParseException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fecha inválida");
    }

    List<Reserva> reservas = reservaRepository.findByIdcanchaAndFechaAndIdhorario(idcancha, fechaParsed, idhorario);
    if (reservas.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró ninguna reserva para esos datos.");
    }

    reservaRepository.deleteAll(reservas);
}

@GetMapping("/all")
public List<Reserva> obtenerTodasLasReservas() {
    return reservaRepository.findAll();
}

@DeleteMapping("/{id}")
public void eliminarReservaPorId(@PathVariable String id) {
    if (!ObjectId.isValid(id)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID de reserva inválido");
    }
    
    reservaRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva no encontrada"));
    
    reservaRepository.deleteById(id);
}

}
