package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.*;

public record UserReq(
        @NotBlank
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String name,

        @NotBlank
        @Size(min = 2, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String last_name,

        @Email
        String email,

        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-])[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]{8,}$\n",
                message = "Password must contain at least one uppercase letter, one lowercase letter and one special character")
        String password
) {
}
