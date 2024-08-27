package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserReq(
        @NotBlank
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]$", message = "Doesn't match ^[a-zA-Z\\s]$")
        String name,
        @NotBlank
        @Size(min = 4, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]$", message = "Doesn't match ^[a-zA-Z\\s]$")
        String lastname,
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$",
                message = "Doesn't match ^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$")
        @Size(min = 10)
        String email,
        @NotBlank
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-_+|!¡@#$%^&\\.{}\\*\"'\\/()=?!¿'´~;,:<>°])[A-Za-z\\d-_+|!¡@#$%^&\\.{}\\*\"'\\/()=?!¿'´~;,:<>°]+$",
                message = "At least 1 lower case, upper case, special char and number.")
        @Size(min = 8, max = 16)
        String password,
        @NotBlank
        @Size(min = 8)
        @NotBlank
        String dniFrontUrl,
        @NotBlank
        @Size(min = 8)
        String dniBackUrl,
        @NotBlank
        @Size(min = 5)
        String phone,
        @NotNull
        Integer roleId
) {
}
