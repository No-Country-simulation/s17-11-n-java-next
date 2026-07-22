package com.nocountry.retrueque.model.dto.response;



import java.time.LocalDate;

public record RequestRes(
        Long id,
        String description,
        LocalDate date,
        Boolean status,
        Short rating,
        String review,
        UserRequest user,
        UserService provider,
        ServiceSummary service
) {
    public record ServiceSummary(
            Long id,
            String title
    ) {
    }

    public record UserService(
            Long id,
            String name,
            String last_name,
            String img_profile,
            String provincia,
            String departamento,
            String phone
    ){
    }

    public record UserRequest(
            Long id,
            String name,
            String last_name,
            String img_profile,
            String provincia,
            String departamento

    ){
    }



}
