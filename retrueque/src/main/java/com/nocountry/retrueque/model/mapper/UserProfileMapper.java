package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {

    @Mapping(source = "profileImage", target = "profile_image_url")
    @Mapping(source = "dniFrontImage", target = "dni_front_url")
    @Mapping(source = "dniBackImage", target = "dni_back_url")
    @Mapping(source = "phone", target = "phone")
    UserProfileEntity toEntity(UserProfileReq userProfileReq);

    @Mapping(source = "profile_image_url", target = "profileImageUrl")
    @Mapping(source = "dni_front_url", target = "dniFrontUrl")
    @Mapping(source = "dni_back_url", target = "dniBackUrl")
    @Mapping(source = "departamento.name", target = "departamento")
    @Mapping(source = "departamento.provincia.name", target = "provincia")
    UserProfileRes toResponse(UserProfileEntity userProfileEntity);

}