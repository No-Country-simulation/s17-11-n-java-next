package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {



    @Mapping(source = "profile_image_url", target = "profileImageUrl")
    @Mapping(source = "dni_front_url", target = "dniFrontUrl")
    @Mapping(source = "dni_back_url", target = "dniBackUrl")
    @Mapping(source = "departamento.name", target = "departamento")
    @Mapping(source = "departamento.provincia.name", target = "provincia")
    // Mapeo de los campos de UserEntity
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "user.last_name", target = "lastname")
    @Mapping(source = "user.email", target = "email")
    UserProfileRes toResponse(UserProfileEntity userProfileEntity);
}
