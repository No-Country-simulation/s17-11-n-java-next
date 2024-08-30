package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.response.EmailVerificationTokenRes;
import com.nocountry.retrueque.model.entity.UserEntity;

public interface TokenService {
    String createVerificationToken(UserEntity user);
    EmailVerificationTokenRes verifyToken(String token);
}
