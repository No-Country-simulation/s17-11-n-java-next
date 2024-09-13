package com.nocountry.retrueque.model.dto.response;


import com.nocountry.retrueque.model.entity.UserEntity;

import java.time.LocalDate;

public record RequestRes(
        Long id,
        String description,
        LocalDate date,
        Boolean status,
        UserRequest user
) {

    public record UserRequest(
            String name,
            String last_name,
            String img_profile,
            String provincia,
            String departamento

    ){
    }

}
