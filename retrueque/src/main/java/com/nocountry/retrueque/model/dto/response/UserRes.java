package com.nocountry.retrueque.model.dto.response;


import com.nocountry.retrueque.model.entity.Role;

import java.time.LocalDateTime;

public record UserRes(
        int id,
        String name,
        String lastname,
        String email,
        String dniFrontUrl,
        String dniBackUrl,
        String phone,
        LocalDateTime createdAt,
        Role role
) {
}
