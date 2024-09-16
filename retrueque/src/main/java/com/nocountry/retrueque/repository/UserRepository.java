package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.dto.response.UserRatingInfoRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  @Transactional
  @Modifying
  @Query("UPDATE UserEntity u SET u.isDeleted = false WHERE u.id = :id")
  int softDelete(long id);

  Optional<UserEntity> findByEmail(String email);

  @Query("SELECT new com.nocountry.retrueque.model.dto.response.UserRatingInfoRes(" +
          "u.name, u.last_name, p.profile_image_url, d.name, pr.name, " +
          "CAST(COALESCE((SELECT AVG(r.rating) FROM Request r JOIN r.serviceTarget s WHERE s.user.id = :userId AND r.isConfirm = true AND r.rating IS NOT NULL), 0.0) AS DOUBLE ))" +
          "FROM UserEntity u " +
          "JOIN u.profile p " +
          "JOIN p.departamento d " +
          "JOIN d.provincia pr " +
          "WHERE u.id = :userId")
  UserRatingInfoRes findUserRatingInfoByUserId(@Param("userId") Long userId);
}
