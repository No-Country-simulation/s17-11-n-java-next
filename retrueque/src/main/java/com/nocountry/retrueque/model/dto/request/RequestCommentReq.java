package com.nocountry.retrueque.model.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record RequestCommentReq(
        @Size(min = 6, max = 255)
        String review,

        @Min(1)
        @Max(5)
        short rating
) {
}
