package com.canchas.backend.repository;

import com.canchas.backend.model.Horario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HorarioRepository extends MongoRepository<Horario, String> {
}
