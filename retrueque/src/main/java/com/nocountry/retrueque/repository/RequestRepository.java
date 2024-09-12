package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findAllByServiceTargetId(Long serviceId);

    List<Request> findAllByUserOriginId(Long userId);

    @Query("SELECT r FROM Request r WHERE r.serviceTarget.user.id = :userId")
    List<Request> findAllByServiceTargetUserId(@Param("userId") Long userId);
}
