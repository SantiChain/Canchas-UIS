package com.canchas.backend.controller;

import com.canchas.backend.model.Usuario;
import com.canchas.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody Usuario user) {
    Optional<Usuario> existing = usuarioRepo.findByCodigo(user.getCodigo());

    if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login exitoso");
        response.put("codigo", existing.get().getCodigo()); // Devuelve el código
        return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("message", "Credenciales inválidas"));
}

@GetMapping("/usuarios/{codigo}")
public ResponseEntity<?> obtenerUsuarioPorCodigo(@PathVariable String codigo) {
    Optional<Usuario> usuario = usuarioRepo.findByCodigo(codigo);
    if (usuario.isPresent()) {
        return ResponseEntity.ok(usuario.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
}




@DeleteMapping("/usuarios/{codigo}")
public ResponseEntity<String> eliminarUsuario(@PathVariable String codigo) {
    Optional<Usuario> usuario = usuarioRepo.findByCodigo(codigo);

    if (usuario.isPresent()) {
        usuarioRepo.delete(usuario.get());
        return ResponseEntity.ok("Usuario eliminado");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
}

@PostMapping("/register")
public ResponseEntity<?> registrarUsuario(@RequestBody Usuario nuevoUsuario) {
    Optional<Usuario> existente = usuarioRepo.findByCodigo(nuevoUsuario.getCodigo());
    
    if (existente.isPresent()) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body("Ya existe un usuario con ese código");
    }

    usuarioRepo.save(nuevoUsuario);
    return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
}

@PutMapping("/usuarios/{codigo}")
public ResponseEntity<?> actualizarUsuario(@PathVariable String codigo, @RequestBody Usuario usuarioActualizado) {
    Optional<Usuario> existente = usuarioRepo.findByCodigo(codigo);

    if (existente.isPresent()) {
        Usuario usuario = existente.get();
        usuario.setEmail(usuarioActualizado.getEmail());
        usuario.setPassword(usuarioActualizado.getPassword());
        usuarioRepo.save(usuario);
        return ResponseEntity.ok("Usuario actualizado exitosamente");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }
}




}
