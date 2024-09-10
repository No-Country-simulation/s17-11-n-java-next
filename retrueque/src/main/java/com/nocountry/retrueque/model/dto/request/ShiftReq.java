package com.nocountry.retrueque.model.dto.request;


import java.util.Set;

public record ShiftReq(
        Set<Integer> days,
        Set<Integer> shiftTime
        ) {
}
