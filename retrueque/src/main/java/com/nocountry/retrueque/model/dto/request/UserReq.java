package com.nocountry.retrueque.model.dto.request;

public record UserReq(
        String name,
        String last_name,
        String email,
        String password
) {
}
