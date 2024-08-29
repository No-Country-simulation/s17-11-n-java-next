package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.response.UserEmailVerificationRes;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmailVerificationMapper {
    EmailVerificationMapper INSTANCE = Mappers.getMapper(EmailVerificationMapper.class);

    UserEmailVerificationRes toUserEmailVerificationRes(String email, boolean isVerified);
}
