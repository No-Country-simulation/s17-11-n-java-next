package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.*;

public record UserReq(
        @NotBlank
        @Size(min = 2, max = 100, message = "Name must be at least 8 characters long and no more than 100 characters")
        @Pattern(regexp = "^[A-ZÑ][a-zñáéíóúü]+(?: [A-ZÑ][a-zñáéíóúü]+)*$",
                message = "Name should only contain letters and spaces.")
        String name,

        @NotBlank
        @Size(min = 2, max = 100, message = "Name must be at least 8 characters long and no more than 100 characters")
        @Pattern(regexp = "^[A-ZÑ][a-zñáéíóúü]+(?: [A-ZÑ][a-zñáéíóúü]+)*$",
                message = "Name should only contain letters and spaces.")
        String last_name,

        @Email
        String email,

        @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&*()_+{}|;:'\"<>/?])[A-Za-z\\d@$%^&*()_+{}|;:'\"<>/?]{6,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password
) {
}
