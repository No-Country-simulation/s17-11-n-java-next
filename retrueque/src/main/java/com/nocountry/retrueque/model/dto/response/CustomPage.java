package com.nocountry.retrueque.model.dto.response;

import java.util.List;

public record CustomPage<T>(
        List<T> content,
        int currentPage,
        int totalPages,
        long totalElements,
        boolean isFirst,
        boolean isLast,
        int pageSize
){ }
