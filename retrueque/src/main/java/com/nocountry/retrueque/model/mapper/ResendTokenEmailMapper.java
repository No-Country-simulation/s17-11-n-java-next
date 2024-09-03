package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResendTokenEmailMapper {
    ResendTokenEmailRes toResendTokenEmailRes(String email, String message);
}