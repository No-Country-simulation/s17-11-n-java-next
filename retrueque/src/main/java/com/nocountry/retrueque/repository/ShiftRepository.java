package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Shift;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {

  @Modifying
  @Transactional
  @Query("update Shift s set s.days = days where s.id = id")
  int updateShiftById(long id, String days);
}
