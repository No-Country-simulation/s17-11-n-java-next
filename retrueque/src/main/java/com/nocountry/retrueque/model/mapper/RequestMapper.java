package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.model.entity.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface RequestMapper {


    Request toEntity(RequestReq request);

    @Mapping(source = "userOrigin.name", target = "user.name")
    @Mapping(source = "userOrigin.last_name", target = "user.last_name")
    @Mapping(source = "userOrigin.profile.profile_image_url", target = "user.img_profile")
    @Mapping(source = "userOrigin.profile.departamento.provincia.name", target = "user.provincia")
    @Mapping(source = "userOrigin.profile.departamento.name", target = "user.departamento")
    @Mapping(source = "isConfirm", target = "status")
    RequestRes toRequestRes(Request request);

}
