package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.ResendTokenEmailMapper;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.EmailService;
import com.nocountry.retrueque.service.interfaces.TokenService;
import com.nocountry.retrueque.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImp implements EmailService {

    @Value("${email.link.confirmation}")
    private String linkConfirmation;

    private final JavaMailSender javaMailSender;
    private final TokenService tokenService;
    private final ResendTokenEmailMapper resendTokenEmailMapper;
    private final UserRepository userRepository;

    @Override
    public void sendEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Confirma tu cuenta");
        message.setText("Para confirmar tu cuenta, haz clic en el siguiente enlace: " + linkConfirmation+token);
        javaMailSender.send(message);
    }

    @Override
    public ResendTokenEmailRes resendVerificationToken(ResendTokenEmailReq request) {
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("User with provided email does not exist."));

        if (user.isEnabled()) {
            throw new IllegalArgumentException("User is already verified.");
        }
        String token = tokenService.createVerificationToken(user);
        sendEmail(user.getEmail(), token);
        return resendTokenEmailMapper.toResendTokenEmailRes(user.getEmail(), "Verification token has been resent to your email.");
    }
}
