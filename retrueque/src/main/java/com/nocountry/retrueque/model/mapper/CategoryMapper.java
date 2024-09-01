package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.CategoryReq;
import com.nocountry.retrueque.model.dto.response.CategoryRes;
import com.nocountry.retrueque.model.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
  CategoryRes entityToRes(Category category);
  Category reqToEntity(CategoryReq categoryReq);
}
