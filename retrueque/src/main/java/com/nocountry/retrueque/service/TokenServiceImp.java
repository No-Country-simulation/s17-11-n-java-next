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

    @Override
    public String createVerificationToken(UserEntity user) {
        return jwtUtils.generateEmailVerificationToken(user);
    }

    @Override
    public EmailVerificationTokenRes verifyToken(String token) {
        validateToken(token);
        UserEntity user = getUserFromToken(token);
        validateUserStatus(user);

        user.setEnabled(true);
        userRepository.save(user);

        return emailVerificationMapper.toUserEmailVerificationRes(user.getEmail(), user.isEnabled());
    }

    private void validateToken(String token) {
        if (jwtUtils.isTokenExpired(token)) {
            throw new RuntimeException("Token expirado");
        }
    }

    private UserEntity getUserFromToken(String token) {
        String email = jwtUtils.getUsernameFromToken(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Token inválido"));
    }

    private void validateUserStatus(UserEntity user) {
        if (user.isEnabled()) {
            throw new RuntimeException("El usuario ya está verificado");
        }
    }
}
