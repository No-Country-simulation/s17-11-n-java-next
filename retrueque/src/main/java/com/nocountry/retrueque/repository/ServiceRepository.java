package com.nocountry.retrueque.repository;

import com.nocountry.retrueque.model.entity.Services;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Long>, JpaSpecificationExecutor<Services> {
  default Page<Services> findAllByFilter(
          Pageable page,
          Integer departamento,
          Integer provincia,
          Integer category){

    return findAll((Root<Services> root, CriteriaQuery<?> query, CriteriaBuilder builder)->{
      List<Predicate> predicates = new ArrayList<>();
      if(departamento != null ){
        predicates.add(builder.equal(root.get("departamento").get("id"), departamento));
      }
      if(provincia != null ){
        predicates.add(builder.equal(root.get("departamento").get("provincia").get("id"), provincia));
      }
      if(category != null ){
        predicates.add(builder.equal(root.get("category").get("id"), category));
      }
      return builder.and(predicates.toArray(new Predicate[0]));
    }, page);
  }
}
