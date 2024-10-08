package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.ProvinciaRes;
import com.nocountry.retrueque.model.entity.ProvinciaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProvinciaMapper {

    ProvinciaMapper INSTANCE = Mappers.getMapper(ProvinciaMapper.class);

    @Mapping(source = "name", target = "name")
    ProvinciaRes toProvinciaRes(ProvinciaEntity provinciaEntity);

}
