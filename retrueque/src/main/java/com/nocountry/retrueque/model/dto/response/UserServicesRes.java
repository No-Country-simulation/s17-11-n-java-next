package com.nocountry.retrueque.model.dto.response;

import java.util.List;

public record UserServicesRes(
        String name,
        String lastname,
        String provincia,
        String departamento,
        String profileImgUrl,
        List<ServicesUserRes> services
) {
    public record ServicesUserRes(
            Long id,
            String title,
            String serviceImgUrl,
            String description
    ){

    }
}
