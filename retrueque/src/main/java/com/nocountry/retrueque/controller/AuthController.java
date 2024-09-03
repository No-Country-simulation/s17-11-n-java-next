package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.LoginReq;
import com.nocountry.retrueque.model.dto.request.EmailVerificationTokenReq;
import com.nocountry.retrueque.model.dto.request.ResendTokenEmailReq;
import com.nocountry.retrueque.model.dto.request.UserReq;
import com.nocountry.retrueque.model.dto.response.LoginRes;
import com.nocountry.retrueque.model.dto.response.EmailVerificationTokenRes;
import com.nocountry.retrueque.model.dto.response.ResendTokenEmailRes;
import com.nocountry.retrueque.model.dto.response.UserRes;
import com.nocountry.retrueque.model.entity.UserEntity;
import com.nocountry.retrueque.model.mapper.ResendTokenEmailMapper;
import com.nocountry.retrueque.service.EmailServiceImp;
import com.nocountry.retrueque.service.TokenServiceImp;
import com.nocountry.retrueque.service.UserServiceImp;
import com.nocountry.retrueque.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.nocountry.retrueque.service.interfaces.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.base}/auth")
@RequiredArgsConstructor
@Tag(name="Authentication")
public class AuthController {
  private final TokenServiceImp tokenService;
  private final EmailService emailService;
  private final AuthService authService;

  @Operation(summary = "Authenticate the user.")
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginReq request){
      LoginRes response = this.authService.login(request);
      return ResponseEntity.ok(new ApiResponse<LoginRes>(response));
  }
  @Operation(summary = "Register the user.")
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid UserReq request){
    UserRes response = this.authService.regist(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<UserRes>(response));
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verify(@RequestBody EmailVerificationTokenReq request){
    EmailVerificationTokenRes response = tokenService.verifyToken(request.token());
    return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(new ApiResponse<EmailVerificationTokenRes>(response));
  }

  @PostMapping("/resend-verification-token")
  public ResponseEntity<?> resendVerificationToken(@RequestBody ResendTokenEmailReq request) {
    ResendTokenEmailRes response = emailService.resendVerificationToken(request);
    return ResponseEntity.ok(new ApiResponse<ResendTokenEmailRes>(response));
  }

}
