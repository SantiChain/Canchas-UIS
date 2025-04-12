package com.canchas.backend.repository;

import com.canchas.backend.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByCodigo(String codigo);
    Optional<Usuario> findByCodigoAndPassword(String codigo, String password); // <- Aquí corregido
    Optional<Usuario> findByEmail(String email);
    
}
