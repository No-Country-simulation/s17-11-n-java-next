package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DepartamentoRepository extends JpaRepository<DepartamentoEntity, Long> {
    List<DepartamentoEntity> findByProvinciaId(Long provinciaId);

    @Query("SELECT d FROM DepartamentoEntity d LEFT JOIN FETCH d.provincia WHERE d.id = :id")
    Optional<DepartamentoEntity> findByIdWithProvincia(@Param("id") Long id);
}
