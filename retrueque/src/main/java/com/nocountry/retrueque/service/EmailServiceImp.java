package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.UserAlreadyVerifiedException;
import com.nocountry.retrueque.exception.UserEmailNotFoundException;
import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.ResendTokenEmailMapper;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.EmailService;
import com.nocountry.retrueque.service.interfaces.TokenService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImp implements EmailService {



    private final JavaMailSender javaMailSender;
    private final TokenService tokenService;
    private final ResendTokenEmailMapper resendTokenEmailMapper;
    private final UserRepository userRepository;
    private final SpringTemplateEngine templateEngine;

    @Value("${email.link.confirmation}")
    private String linkConfirmation;

    @Override
    public void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariables(templateModel);

            String htmlBody = templateEngine.process(templateName, context);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            javaMailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResendTokenEmailRes resendVerificationToken(ResendTokenEmailReq request) {
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserEmailNotFoundException("El usuario con el email "+request.email()+ " no existe"));

        if (user.isEnabled()) {
            throw new UserAlreadyVerifiedException("El usuario con el email "+request.email()+ " ya tiene su cuenta verificada");
        }

        String token = tokenService.createVerificationToken(user);

        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("name", user.getName()+" "+user.getLast_name());
        templateModel.put("confirmationUrl", linkConfirmation+token);

        sendEmail(user.getEmail(),"¡Casi terminamos! Confirma tu email para empezar a soicitar o publicar tus servicios.",templateModel,"confirm-email");


        return resendTokenEmailMapper.toResendTokenEmailRes(user.getEmail(), "Verification token has been resent to your email.");
    }

    public void EmailConfirmation(String to, String subject, Map<String, Object> templateModel) {

    }
}
