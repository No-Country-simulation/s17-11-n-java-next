package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.ProvinciaEntity;
import com.nocountry.retrueque.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
