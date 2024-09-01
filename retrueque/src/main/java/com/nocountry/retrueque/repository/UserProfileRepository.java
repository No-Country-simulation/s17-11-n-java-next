package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Role;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
}
