package com.nocountry.retrueque.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_origin_id", nullable = false)
    private UserEntity userOrigin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_target_id", nullable = false)
    private Services serviceTarget;

    private Boolean isConfirm;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Min(1)
    @Max(5)
    @Column
    private Short rating;

    @Column(columnDefinition = "TEXT")
    private String review;

    @PrePersist
    protected void onCreate() {
        this.date = LocalDate.now();
    }
}
