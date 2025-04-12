package com.canchas.backend.controller;

import com.canchas.backend.model.Usuario;
import com.canchas.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/v1")
@CrossOrigin(origins = "*") // Para permitir conexión desde React
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public String registrarUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByCodigo(usuario.getCodigo());

        if (existente.isPresent()) {
            return "Usuario ya registrado";
        }

        usuarioRepository.save(usuario);
        return "Registro exitoso";
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        Optional<Usuario> encontrado = usuarioRepository.findByCodigoAndPassword(
            usuario.getCodigo(), usuario.getPassword());

        return encontrado.isPresent() ? "Login exitoso" : "Credenciales incorrectas";
    }
}
