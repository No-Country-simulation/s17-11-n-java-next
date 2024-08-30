package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.EmailVerificationTokenRes;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmailVerificationMapper {
    EmailVerificationTokenRes toUserEmailVerificationRes(String email, boolean isVerified);
}
