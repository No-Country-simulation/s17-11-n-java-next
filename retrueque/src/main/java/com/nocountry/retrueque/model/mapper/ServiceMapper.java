package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.exception.CategoryNotFoundException;
import com.nocountry.retrueque.model.dto.request.ServiceReq;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import com.nocountry.retrueque.model.entity.Category;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.repository.CategoryRepository;
import com.nocountry.retrueque.service.interfaces.S3FileUploadService;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {
        CategoryMapper.class,
        UserMapper.class
})
public interface ServiceMapper {

  @Mapping(target = "category", source = "categoryId")
  Services reqToEntity(ServiceReq req, @Context CategoryRepository categoryRepository,
                       @Context S3FileUploadService s3FileUploadService);
  ServiceRes entityToRes(Services service);

  default Category map(Integer id, @Context CategoryRepository categoryRepository){
    return categoryRepository.findById(id.longValue())
            .orElseThrow(()->new CategoryNotFoundException(id));
  }

  default String map(Set<MultipartFile> images, @Context S3FileUploadService s3FileUploadService){
    return images.stream().map(s3FileUploadService::uploadFile).collect(Collectors.joining(","));
  }
}
