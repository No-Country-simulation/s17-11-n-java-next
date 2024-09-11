package com.nocountry.retrueque.model.dto.response;

public record ReportRes(
        Long id,
        String description,
        Integer reportStatus,
        UserResShort user,
        ServiceResShort service
) {
}
