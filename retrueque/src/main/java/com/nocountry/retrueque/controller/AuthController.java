package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.LoginReq;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.LoginRes;
import com.nocountry.retrueque.model.dto.response.UserEmailVerificationRes;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.service.TokenServiceImp;
import com.nocountry.retrueque.service.interfaces.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.base}/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;
  private final TokenServiceImp tokenServiceImp;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginReq request){
      LoginRes response = this.authService.login(request);
      return ResponseEntity.ok(new ApiResponse<LoginRes>(response));
  }
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid UserReq request){
    UserRes response = this.authService.regist(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<UserRes>(response));
  }
/*
  @PostMapping("/verfy")
  public ResponseEntity<?> verfy(@RequestBody String token){
    UserEmailVerificationRes isVerified = tokenServiceImp.verifyToken(token);
    return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(new ApiResponse<UserEmailVerificationRes>(isVerified));
  }
*/
}
