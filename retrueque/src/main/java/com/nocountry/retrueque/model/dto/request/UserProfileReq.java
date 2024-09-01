package com.nocountry.retrueque.model.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record UserProfileReq(
        String profileImage,
        String dniFrontImage,
        String dniBackImage,
        String phone,
        long departamento_id
) {
}
