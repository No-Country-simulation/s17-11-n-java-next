package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.Email;

public record ResendTokenEmailReq(
        @Email
        String email
) {
}
