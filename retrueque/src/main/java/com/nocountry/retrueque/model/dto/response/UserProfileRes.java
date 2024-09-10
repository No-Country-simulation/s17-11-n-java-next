package com.nocountry.retrueque.model.dto.response;

public record UserProfileRes(
        Long id,
        String profileImageUrl,
        String dniFrontUrl,
        String dniBackUrl,
        String phone,
        String departamento,
        String provincia,
        String name,
        String lastname,
        String email
) {
}
