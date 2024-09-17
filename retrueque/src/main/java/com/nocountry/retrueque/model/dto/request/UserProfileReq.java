package com.nocountry.retrueque.model.dto.request;



import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

public record UserProfileReq(
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String name,

        @Size(min = 2, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String lastname,

        @Email
        String email,

        String phone,

        Long departamento_id,

        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-])[A-Za-z\\d!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]{8,}$\n",
                message = "Password must contain at least one uppercase letter, one lowercase letter and one special character")
        String password,

        MultipartFile profileImage,
        MultipartFile dniFrontImage,
        MultipartFile dniBackImage
) {
}
