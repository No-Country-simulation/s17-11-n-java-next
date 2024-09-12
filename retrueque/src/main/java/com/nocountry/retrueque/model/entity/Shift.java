package com.nocountry.retrueque.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Shift {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String days;
  @OneToMany(mappedBy = "shift", cascade = CascadeType.ALL)
  private List<ShiftTimeByShift> shifts;

  public Shift(String days) {
    this.days = days;
  }
}