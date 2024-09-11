package com.nocountry.retrueque.model.dto.response;

public record LoginRes(
        String token,
        String role,
        Long id
) {
}
