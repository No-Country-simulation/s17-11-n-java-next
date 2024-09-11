package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Role;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {

    Optional<UserProfileEntity> findByUser(UserEntity user);
}
