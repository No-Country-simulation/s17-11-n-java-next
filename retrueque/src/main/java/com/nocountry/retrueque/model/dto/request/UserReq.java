package com.nocountry.retrueque.model.dto.request;

public record UserReq(
        String name,
        String email,
        String password,
        String dniFrontUrl,
        String dniBackUrl,
        String phone,
        int roleId
) {
}
