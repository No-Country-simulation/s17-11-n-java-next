package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.response.EmailVerificationTokenRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.EmailVerificationMapper;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.service.interfaces.TokenService;
import com.nocountry.retrueque.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImp implements TokenService {
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final EmailVerificationMapper emailVerificationMapper;

    //Crea el token que se enviara al email
    @Override
    public String createVerificationToken(UserEntity user) {
        return jwtUtils.generateEmailVerificationToken(user);
    }

    //Verifica que el token que envio el usuario para comprobar su email sea valído
    @Override
    public EmailVerificationTokenRes verifyToken(String token) {
        if (jwtUtils.isTokenExpired(token)) {
            throw new IllegalArgumentException("Token expirado");
        }
        // Decodificar el token y extraer el email del usuario
        String email = jwtUtils.getUsernameFromToken(token);
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Token invalido"));

        // Verificar si el usuario ya está habilitado
        if (user.isEnabled()) {
            throw new IllegalArgumentException("El usuario ya está verificado");
        }

        user.setEnabled(true);
        userRepository.save(user);

        return emailVerificationMapper.toUserEmailVerificationRes(user.getEmail(), user.isEnabled());
    }

}
