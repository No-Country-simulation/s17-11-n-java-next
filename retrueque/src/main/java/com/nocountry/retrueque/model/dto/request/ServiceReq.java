package com.nocountry.retrueque.model.dto.request;

import com.nocountry.retrueque.model.dto.OnCreate;
import com.nocountry.retrueque.model.dto.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public record ServiceReq(
        @NotBlank(groups = OnCreate.class)
        @Size(min=5, max = 100,groups = {OnCreate.class, OnUpdate.class})
        String title,
        @NotBlank(groups = OnCreate.class)
        @Size(min=10, groups = {OnCreate.class, OnUpdate.class})
        String description,
        @NotBlank(groups = OnCreate.class)
        @Size(min=10, groups = {OnCreate.class, OnUpdate.class})
        String rules,
        Set<MultipartFile> imgUrl,
        @NotNull(groups = OnCreate.class) Integer categoryId,
        @NotNull(groups = OnCreate.class) Set<Integer> days,
        @NotNull(groups = OnCreate.class) Set<Integer> shiftTime
) {
}
