package com.nocountry.retrueque.model.dto.response;

import java.util.Set;

public record ShiftRes(
        Set<Integer> days,
        Set<Integer> shifts
) {
}
