package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
