package com.nocountry.retrueque.model.entity;

import com.nocountry.retrueque.model.enums.ShiftTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ShiftTimeByShift {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Enumerated(EnumType.STRING)
  private ShiftTime shiftTime;
  @ManyToOne
  @JoinColumn(name = "shift_id")
  private Shift shift;
}
