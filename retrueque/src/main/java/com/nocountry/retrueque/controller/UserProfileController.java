package com.nocountry.retrueque.controller;

import com.nocountry.retrueque.model.dto.request.UserProfileReq;
import com.nocountry.retrueque.model.dto.response.UserProfileRes;
import com.nocountry.retrueque.model.entity.UserProfileEntity;
import com.nocountry.retrueque.service.interfaces.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user-profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PostMapping
    public ResponseEntity<?> createUserProfile(@RequestBody UserProfileReq userProfileReq) {
        UserProfileRes response = userProfileService.createUserProfile(userProfileReq);
        return ResponseEntity.ok(new ApiResponse<UserProfileRes>(response));
    }

}
