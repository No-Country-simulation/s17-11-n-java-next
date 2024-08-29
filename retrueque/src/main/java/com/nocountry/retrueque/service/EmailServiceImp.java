package com.nocountry.retrueque.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImp {

    @Value("${email.link.confirmation}")
    private String linkConfirmation;

    private final JavaMailSender javaMailSender;

    public void sendEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Confirma tu cuenta");
        message.setText("Para confirmar tu cuenta, haz clic en el siguiente enlace: " + linkConfirmation+token);
        javaMailSender.send(message);
    }

}
