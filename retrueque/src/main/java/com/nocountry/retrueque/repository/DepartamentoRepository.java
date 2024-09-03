package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartamentoRepository extends JpaRepository<DepartamentoEntity, Long> {
    List<DepartamentoEntity> findByProvinciaId(Long provinciaId);
}
