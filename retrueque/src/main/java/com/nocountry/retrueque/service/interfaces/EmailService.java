package com.nocountry.retrueque.service.interfaces;

import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;

import java.util.Map;

public interface EmailService {

    void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName);

    ResendTokenEmailRes resendVerificationToken(ResendTokenEmailReq request);

}
