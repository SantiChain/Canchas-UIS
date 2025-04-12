package com.canchas.backend.repository;

import com.canchas.backend.model.Reserva;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.Optional;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.Query;

public interface ReservaRepository extends MongoRepository<Reserva, String> {

    @Query("{ 'idcancha': ?0, 'fecha': { $gte: ?1, $lte: ?2 } }")
    List<Reserva> findByIdcanchaAndFechaInRange(String idcancha, Date startDate, Date endDate);
    List<Reserva> findByIdcanchaAndFechaAndIdhorario(String idcancha, Date fecha, String idhorario);
    List<Reserva> findByIdcanchaAndFechaBetween(String idcancha, Date startDate, Date endDate);
    List<Reserva> findByIdcanchaAndFecha(String idcancha, Date fecha);
    List<Reserva> findByFecha(Date fecha);

    



}

