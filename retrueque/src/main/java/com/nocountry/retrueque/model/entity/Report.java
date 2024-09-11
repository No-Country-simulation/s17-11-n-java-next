package com.nocountry.retrueque.model.entity;

import com.nocountry.retrueque.model.enums.ReportStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Report {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(columnDefinition = "TEXT")
  private String description;
  private LocalDate date;
  @Enumerated(EnumType.STRING)
  private ReportStatus reportStatus;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;
  @ManyToOne
  @JoinColumn(name = "service_id")
  private Services service;

  @PrePersist
  public void onCreate(){
    this.date = LocalDate.now();
    this.reportStatus = ReportStatus.PENDING;
  }
}
