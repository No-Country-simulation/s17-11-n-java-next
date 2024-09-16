package com.nocountry.retrueque.model.dto.response;

public record UserRatingInfoRes(
        String name,
        String lastName,
        String profileImageUrl,
        String departamento,
        String provincia,
        Double averageRating
) {
}
