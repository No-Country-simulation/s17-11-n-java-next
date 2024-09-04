package com.nocountry.retrueque.model.dto.response;


import com.nocountry.retrueque.model.entity.Role;

import java.time.LocalDateTime;

public record UserRes(
        int id,
        String name,
        String last_name,
        String email,
        LocalDateTime createdAt,
        Role role
) {
}
