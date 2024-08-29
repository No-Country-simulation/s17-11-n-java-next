package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.response.UserEmailVerificationRes;
import com.nocountry.retrueque.model.entity.TokenEntity;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.EmailVerificationMapper;
import com.nocountry.retrueque.repository.TokenRepository;
import com.nocountry.retrueque.repository.UserRepository;
import com.nocountry.retrueque.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImp {
    private final TokenRepository tokenRepository;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    //private final EmailVerificationMapper emailVerificationMapper;


    public String createVerificationToken(UserEntity user) {
        TokenEntity verificationToken = new TokenEntity();
        verificationToken.setUser(user);

        String token = jwtUtils.generateEmailVerificationToken(user);
        verificationToken.setToken(token);

        tokenRepository.save(verificationToken);

        return token;
    }


    /*
    public UserEmailVerificationRes verifyToken(String token) {

        TokenEntity storedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido"));

        if (jwtUtils.isTokenExpired(storedToken.getToken())) {
            throw new IllegalArgumentException("Token expirado");
        }

        UserEntity user = storedToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        //return emailVerificationMapper.toUserEmailVerificationRes(user.getEmail(),user.isEnabled());
    }

     */
}
