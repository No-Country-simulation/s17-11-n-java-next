package com.nocountry.retrueque.repository;


import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {

    @Query("SELECT up FROM UserProfileEntity up JOIN up.user u WHERE u.email = :email")
    Optional<UserProfileEntity> findByUserEmail(String email);
}
