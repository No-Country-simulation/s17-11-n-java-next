package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public record ServiceReq(
        @NotBlank
        @Size(min=5, max = 100)
        String title,
        @NotBlank
        @Size(min=10)
        String description,
        @NotBlank
        @Size(min=10)
        String rules,

        Set<MultipartFile> imgUrl,
        @NotNull Integer categoryId
) {
}
