package com.canchas.backend.service;

import com.canchas.backend.model.Horario;
import com.canchas.backend.repository.HorarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorarioService {

    private final HorarioRepository horarioRepository;

    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    public Horario agregarHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    public List<Horario> obtenerTodos() {
        return horarioRepository.findAll();
    }
}
