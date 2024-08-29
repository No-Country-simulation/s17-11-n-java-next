package com.nocountry.retrueque.model.dto.response;

public record UserEmailVerificationRes(
       String email,
       boolean isVerified
) {

}
