package com.canchas.backend.controller;

import com.canchas.backend.model.Horario;
import com.canchas.backend.service.HorarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horarios")
@CrossOrigin(origins = "*") // por si el frontend lo consume desde otro puerto
public class HorarioController {

    private final HorarioService horarioService;

    public HorarioController(HorarioService horarioService) {
        this.horarioService = horarioService;
    }

    @PostMapping
    public ResponseEntity<Horario> agregar(@RequestBody Horario horario) {
        Horario creado = horarioService.agregarHorario(horario);
        return ResponseEntity.status(201).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<Horario>> obtenerTodos() {
        List<Horario> horarios = horarioService.obtenerTodos();
        return ResponseEntity.ok(horarios);
    }
}
