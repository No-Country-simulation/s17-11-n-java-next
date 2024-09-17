package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginReq(
        @Email
        String email,

        @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*()_+{}|;:'\"<>/?])[A-Za-z\\d@$%^&*()_+{}|;:'\"<>/?]{6,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password
) {
}
