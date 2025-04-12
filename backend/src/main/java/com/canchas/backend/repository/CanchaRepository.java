package com.canchas.backend.repository;

import com.canchas.backend.model.Cancha;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CanchaRepository extends MongoRepository<Cancha, String> {
}
