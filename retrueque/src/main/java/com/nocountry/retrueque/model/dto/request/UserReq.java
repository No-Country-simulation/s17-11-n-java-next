package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserReq(
        @NotBlank
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String name,
        @NotBlank
        @Size(min = 4, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String last_name,
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$",
                message = "Doesn't match ^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$")
        @Size(min = 10)
        String email,
        String password,
        @NotNull
        Integer roleId
) {
}
