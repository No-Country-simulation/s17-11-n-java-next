package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.UserServicesRes;
import com.nocountry.retrueque.model.entity.Services;
import com.nocountry.retrueque.model.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserServicesMapper {

    @Mapping(source = "name", target = "name")
    @Mapping(source = "last_name", target = "lastname")
    @Mapping(source = "profile.departamento.provincia.name", target = "provincia")
    @Mapping(source = "profile.departamento.name", target = "departamento")
    @Mapping(source = "profile.profile_image_url", target = "profileImgUrl")
    @Mapping(source = "services", target = "services")
    UserServicesRes toResponse(UserEntity userEntity);

    // Mapeo específico para la lista de servicios
    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "imgUrl", target = "serviceImgUrl")
    @Mapping(source = "description", target = "description")
    UserServicesRes.ServicesUserRes serviceToServiceUserRes(Services service);

    // Mapeo de lista de servicios
    default List<UserServicesRes.ServicesUserRes> mapServices(List<Services> services) {
        return services.stream()
                .map(this::serviceToServiceUserRes)
                .toList();
    }
}
