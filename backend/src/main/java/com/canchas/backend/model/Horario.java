package com.canchas.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "horarios")
public class Horario {

    @Id
    private String id;

    private String rango;

    public Horario() {}

    public Horario(String rango) {
        this.rango = rango;
    }

    public String getId() {
        return id;
    }

    public String getRango() {
        return rango;
    }

    public void setRango(String rango) {
        this.rango = rango;
    }
}
