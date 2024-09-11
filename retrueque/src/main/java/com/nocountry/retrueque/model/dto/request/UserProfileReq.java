package com.nocountry.retrueque.model.dto.request;



public record UserProfileReq(
        String profileImage,
        String dniFrontImage,
        String dniBackImage,
        String phone,
        Long departamento_id,
        String name,
        String lastname,
        String email
) {
}
