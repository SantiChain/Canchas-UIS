package com.canchas.backend.controller;

import com.canchas.backend.model.Reserva;
import com.canchas.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadController {

    @Autowired
    private ReservaRepository reservaRepository;

    // Lista de IDs de horarios disponibles
    private static final List<String> horariosDisponibles = Arrays.asList(
        "6681dcf2c62742942c281c11",
        "6681dcf7c62742942c281c13",
        "6681dcfcc62742942c281c15",
        "6681dd01c62742942c281c17",
        "6681dd05c62742942c281c19",
        "6681dd09c62742942c281c1b",
        "6681dd0dc62742942c281c1d",
        "6681dd15c62742942c281c1f"
    );

    @GetMapping
    public Map<String, Object> getDisponibilidad(
        @RequestParam("idcancha") String idCancha,
        @RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha
    ) {
        Map<String, Boolean> disponibilidad = new HashMap<>();

        // Inicializar todos los horarios como disponibles
        for (String idHorario : horariosDisponibles) {
            disponibilidad.put(idHorario, true);
        }

        // Convertir fecha LocalDate al rango de la fecha completa (00:00 a 23:59)
        ZonedDateTime startZdt = fecha.atStartOfDay(ZoneId.of("UTC")); // <- CAMBIO 1: UTC
        ZonedDateTime endZdt = fecha.atTime(23, 59, 59).atZone(ZoneId.of("UTC")); // <- CAMBIO 1: UTC
        Date startDate = Date.from(startZdt.toInstant());
        Date endDate = Date.from(endZdt.toInstant());

        // Consultar reservas existentes para esa cancha y fecha
        List<Reserva> reservas = reservaRepository.findByIdcanchaAndFechaBetween(idCancha, startDate, endDate);

        for (Reserva reserva : reservas) {
            String idHorario = reserva.getIdhorario();
            if (disponibilidad.containsKey(idHorario)) {
                disponibilidad.put(idHorario, false);
            }
        }

        // Respuesta en formato que espera el frontend: { disponibilidad: { idHorario1: true/false, ... } }
        Map<String, Object> response = new HashMap<>();
        response.put("disponibilidad", disponibilidad);
        return response;
    }
}
