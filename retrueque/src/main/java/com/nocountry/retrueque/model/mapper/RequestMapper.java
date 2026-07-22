package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.model.entity.Request;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface RequestMapper {
    Request toEntity(RequestReq request);

    @Mapping(source = "userOrigin.name", target = "name")
    @Mapping(source = "userOrigin.last_name", target = "lastname")
    @Mapping(source = "userOrigin.profile.profile_image_url", target = "imgUrl")
    RequestCommentsRes toRequestCommentsRes(Request request);

    @Mapping(target = "currentPage", source = "page.number")
    @Mapping(target = "totalPages", source = "page.totalPages")
    @Mapping(target = "totalElements", source = "page.totalElements")
    @Mapping(target = "isFirst", source = "page.first")
    @Mapping(target = "isLast", source = "page.last")
    @Mapping(target = "pageSize", source = "page.size")
    CustomPage<RequestCommentsRes> toCustomPage(Page<RequestCommentsRes> page);

    default RequestRes toRequestRes(Request request) {
        var requester = request.getUserOrigin();
        var requesterProfile = requester.getProfile();
        var service = request.getServiceTarget();
        var provider = service.getUser();
        var providerProfile = provider.getProfile();

        var requesterData = new RequestRes.UserRequest(
                requester.getId(),
                requester.getName(),
                requester.getLast_name(),
                requesterProfile.getProfile_image_url(),
                requesterProfile.getDepartamento().getProvincia().getName(),
                requesterProfile.getDepartamento().getName()
        );
        var providerData = new RequestRes.UserService(
                provider.getId(),
                provider.getName(),
                provider.getLast_name(),
                providerProfile.getProfile_image_url(),
                providerProfile.getDepartamento().getProvincia().getName(),
                providerProfile.getDepartamento().getName(),
                Boolean.TRUE.equals(request.getIsConfirm()) ? providerProfile.getPhone() : null
        );

        return new RequestRes(
                request.getId(),
                request.getDescription(),
                request.getDate(),
                request.getIsConfirm(),
                request.getRating(),
                request.getReview(),
                requesterData,
                providerData,
                new RequestRes.ServiceSummary(service.getId(), service.getTitle())
        );
    }
}
