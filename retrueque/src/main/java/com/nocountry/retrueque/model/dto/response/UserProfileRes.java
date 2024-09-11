package com.nocountry.retrueque.model.dto.response;

public record UserProfileRes(
        String name,
        String lastname,
        String email,
        String phone,
        String provincia,
        String departamento,
        String profileImageUrl,
        String dniFrontUrl,
        String dniBackUrl
) {
}
