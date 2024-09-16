package com.nocountry.retrueque.model.dto.request;



import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

public record UserProfileReq(
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String name,

        @Size(min = 4, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String lastname,

        @Email
        String email,

        String phone,

        Long departamento_id,

        String password,

        MultipartFile profileImage,
        MultipartFile dniFrontImage,
        MultipartFile dniBackImage
) {
}
