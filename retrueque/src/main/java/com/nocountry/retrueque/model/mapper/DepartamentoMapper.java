package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.DepartamentoRes;
import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DepartamentoMapper {

    @Mapping(source = "name", target = "name")
    DepartamentoRes toDepartamentoResponseDTO(DepartamentoEntity departamentoEntity);
}