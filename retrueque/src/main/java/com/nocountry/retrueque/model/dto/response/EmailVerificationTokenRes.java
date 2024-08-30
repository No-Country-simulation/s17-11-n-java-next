package com.nocountry.retrueque.model.dto.response;

public record EmailVerificationTokenRes(
       String email,
       boolean isVerified
) {

}
