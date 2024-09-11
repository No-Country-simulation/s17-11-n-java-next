package com.nocountry.retrueque.model.dto.request;

public record ReportReq(
        String description,
        Integer reportStatus,
        Long serviceId
) {
}
