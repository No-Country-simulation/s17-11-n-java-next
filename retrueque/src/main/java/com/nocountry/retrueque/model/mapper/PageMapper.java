package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.ServiceRes;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface PageMapper {

  @Mapping(target = "currentPage", source = "number")
  @Mapping(target = "pageSize", source = "size")
  @Mapping(target = "isFirst", source = "first")
  @Mapping(target = "isLast", source = "last")
  CustomPage<ServiceRes> pageService(Page<ServiceRes> page);
}
