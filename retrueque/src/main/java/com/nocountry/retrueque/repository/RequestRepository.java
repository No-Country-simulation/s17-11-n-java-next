package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.entity.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findAllByUserOriginId(Long userId);

    @Query("SELECT r FROM Request r WHERE r.serviceTarget.user.id = :userId")
    List<Request> findAllByServiceTargetUserId(@Param("userId") Long userId);

    @Query("SELECT new com.nocountry.retrueque.model.dto.response.RequestCommentsRes(r.id, r.userOrigin.name, r.userOrigin.last_name, r.review, r.rating, r.userOrigin.profile.profile_image_url) " +
            "FROM Request r " +
            "JOIN r.serviceTarget s " +
            "JOIN s.user u " +
            "JOIN u.profile p " +
            "WHERE u.id = :userId " +
            "AND r.isConfirm = true " +
            "AND r.review IS NOT NULL")
    Page<RequestCommentsRes> findCommentsByUserId(Long userId, Pageable pageable);


}
