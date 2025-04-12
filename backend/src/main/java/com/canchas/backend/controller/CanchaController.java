package com.canchas.backend.controller;

import com.canchas.backend .model.Cancha;
import com.canchas.backend.repository.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CanchaController {

    @Autowired
    private CanchaRepository canchaRepository;

    @PostMapping("/cancha")
    public ResponseEntity<?> addCancha(@RequestBody Map<String, String> body) {
        try {
            String nombre = body.get("nombre");
            Cancha cancha = new Cancha(nombre);
            Cancha canchaReservada = canchaRepository.save(cancha);

            Map<String, Object> response = new HashMap<>();
            response.put("canchaReservada", canchaReservada);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @GetMapping("/cancha")
    public ResponseEntity<?> getCancha() {
        List<Cancha> canchaList = canchaRepository.findAll();
        Map<String, Object> response = new HashMap<>();
        response.put("cancha", canchaList);
        return ResponseEntity.ok(response);
    }
}
