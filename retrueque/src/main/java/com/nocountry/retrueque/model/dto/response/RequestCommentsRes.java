package com.nocountry.retrueque.model.dto.response;

public record RequestCommentsRes(
        Long id,
        String name,
        String lastname,
        String review,
        Short rating,
        String imgUrl
) {
}
