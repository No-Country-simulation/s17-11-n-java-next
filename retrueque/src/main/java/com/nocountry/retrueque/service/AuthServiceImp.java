package com.nocountry.retrueque.service;

import com.nocountry.retrueque.model.dto.request.LoginReq;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.LoginRes;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.service.interfaces.AuthService;
import com.nocountry.retrueque.service.interfaces.UserService;
import com.nocountry.retrueque.util.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImp implements AuthService {
  private final UserService userService;
  private final JwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;

  @Override
  public LoginRes login(LoginReq loginReq) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginReq.email(), loginReq.password()));
    UserEntity user = userService.getByEmail(loginReq.email());
    String token = this.jwtUtils.generateSessionToken(user);
    return new LoginRes(token, user.getRole().getName(), user.getId());
  }

  @Override
  public UserRes regist(UserReq userReq) {
    return this.userService.create(userReq);
  }

  @Override
  public UserEntity getAuthUser() {
    return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
