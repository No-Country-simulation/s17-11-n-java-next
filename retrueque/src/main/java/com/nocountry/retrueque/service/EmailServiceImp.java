package com.nocountry.retrueque.service;

import com.nocountry.retrueque.exception.EmailDeliveryException;
import com.nocountry.retrueque.exception.UserAlreadyVerifiedException;
import com.nocountry.retrueque.exception.UserEmailNotFoundException;
import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.ResendTokenEmailMapper;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.EmailService;
import com.nocountry.retrueque.service.interfaces.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailServiceImp implements EmailService {



    private final RestClient.Builder restClientBuilder;
    private final TokenService tokenService;
    private final ResendTokenEmailMapper resendTokenEmailMapper;
    private final UserRepository userRepository;
    private final SpringTemplateEngine templateEngine;

    @Value("${email.link.confirmation}")
    private String linkConfirmation;

    @Value("${resend.api-key}")
    private String resendApiKey;

    @Value("${resend.from}")
    private String resendFrom;

    @Override
    public void sendEmail(String to, String subject, Map<String, Object> templateModel, String templateName) {
        Context context = new Context();
        context.setVariables(templateModel);
        String htmlBody = templateEngine.process(templateName, context);

        try {
            restClientBuilder
                    .baseUrl("https://api.resend.com")
                    .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + resendApiKey)
                    .defaultHeader(HttpHeaders.USER_AGENT, "retrueque-backend")
                    .build()
                    .post()
                    .uri("/emails")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new ResendEmailRequest(resendFrom, to, subject, htmlBody))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException exception) {
            throw new EmailDeliveryException("No se pudo enviar el correo en este momento.", exception);
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
    private record ResendEmailRequest(String from, String to, String subject, String html) { }
}
