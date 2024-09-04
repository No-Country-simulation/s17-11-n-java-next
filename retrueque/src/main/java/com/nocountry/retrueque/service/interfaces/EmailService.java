package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;

public interface EmailService {
    void sendEmail(String email, String token);
    ResendTokenEmailRes resendVerificationToken(ResendTokenEmailReq request);

}
