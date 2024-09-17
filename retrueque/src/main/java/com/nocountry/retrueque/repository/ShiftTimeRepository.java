package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.ShiftTimeByShift;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface ShiftTimeRepository extends JpaRepository<ShiftTimeByShift, Long> {
  @Transactional
  @Modifying
  @Query("DELETE FROM ShiftTimeByShift s where s.shift.id = :shiftId")
  void deleteAllByShiftId(Long shiftId);
}
