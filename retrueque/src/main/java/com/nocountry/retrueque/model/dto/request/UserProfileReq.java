package com.nocountry.retrueque.model.dto.request;

public record UserProfileReq(
        String profileImage,
        String dniFrontImage,
        String dniBackImage,
        String phone,
        long departamento_id
) {
}
