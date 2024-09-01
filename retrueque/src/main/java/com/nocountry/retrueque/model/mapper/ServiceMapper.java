package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.exception.CategoryNotFoundException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.entity.Category;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.repository.CategoryRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class,
        UserMapper.class
})
public interface ServiceMapper {

  @Mapping(target = "category", source = "categoryId")
  Services reqToEntity(ServiceReq req, @Context CategoryRepository categoryRepository);
  ServiceRes entityToRes(Services service);

  default Category map(Integer id, @Context CategoryRepository categoryRepository){
    return categoryRepository.findById(id.longValue())
            .orElseThrow(()->new CategoryNotFoundException(id));
  }
}
