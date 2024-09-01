package com.nocountry.retrueque.model.dto.response;


public record ServiceRes(
        Long id,
        String title,
        String description,
        String rules,
        String imgUrl,
        UserResShort user,
        CategoryRes category
) {
}
