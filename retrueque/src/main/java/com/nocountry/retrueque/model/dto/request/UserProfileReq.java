package com.nocountry.retrueque.model.dto.request;


import com.nocountry.retrueque.model.entity.DepartamentoEntity;
import com.nocountry.retrueque.model.entity.ProvinciaEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record UserProfileReq(
        @NotBlank
        @Size(min = 2, max = 50)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String name,

        @NotBlank
        @Size(min = 4, max = 100)
        @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Doesn't match ^[a-zA-Z\\s]+$")
        String lastname,

        @Email
        String email,

        @NotBlank
        String phone,

        Long departamento_id,

        String password,

        MultipartFile profileImage,
        MultipartFile dniFrontImage,
        MultipartFile dniBackImage
) {
}
