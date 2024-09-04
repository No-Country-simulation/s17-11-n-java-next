package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  @Transactional
  @Modifying
  @Query("UPDATE UserEntity u SET u.isDeleted = false WHERE u.id = :id")
  int softDelete(long id);

  Optional<UserEntity> findByEmail(String email);
}
