package com.nocountry.retrueque.model.dto.response;

import java.time.LocalDate;

public record ReportRes(
        Long id,
        String description,
        Integer reportStatus,
        LocalDate date,
        UserResShort user,
        ServiceResShort service
) {
}
